import type { Request, Response } from 'express';
import appLogger from 'utils/logger';
import { UserTask } from 'server/repository/user';
import AsyncMiddleware from 'utils/asyncHandler';
import { TokenService } from 'services/TokenService';
import config from 'config/app-config';
import { LoginBody, RefreshTokenBody } from 'validations/Authorization';
import { TaskOwner } from 'server/common/enums/task';
import Unauthorized from 'responses/clientErrors/Unauthorized';
import { MembershipTask } from 'server/repository/membership/task';
import Success from 'responses/successful/Success.ts';
import { AdminTask } from 'repository/admin/task.ts';

const AuthTasks = {
	user: UserTask,
	admin: AdminTask,
	membership: MembershipTask,
}

export class AuthController {
	public static login = AsyncMiddleware.asyncHandler(
		async (req: Request<unknown, unknown, LoginBody>, res: Response) => {
			const loginType = req.body.type;

			try {
				// delegate login task to specific task
				const task = AuthTasks[loginType];
				// Login user
				const login = await task.login(req.body.username, req.body.password);
				console.log('login', login);
				// Generate access token and refresh token
				const accessToken = await TokenService.generateAuthToken(
					login?.id as string,
					TaskOwner[loginType],
					config.sessionExpire
				);
				// Generate refresh token
				const refreshToken = await TokenService.generateRefreshToken(
					login?.id as string,
					TaskOwner[loginType],
					config.refreshExpire
				);
				// Format response for friendly client
				const response = {
					accessToken: {
						token: accessToken.token,
						expire_access_token: accessToken.expireIn,
						token_type: 'Bearer',
						refresh_token: refreshToken.token,
						expire_refresh_token: refreshToken.expireIn,
					},
					user: login,
				}
				return res.status(200).json(response).end();
			} catch (error: any) {
				appLogger.log(
					'error',
					`AuthController.login - Login request for user: ${req.body.username} failed with error: ${error.errorMessage || error.message}`,
				);
				throw error;
			} finally {
				appLogger.log('info', `AuthController.login - Login request for user: ${req.body.username}`);
			}
		}
	)

	public static register = AsyncMiddleware.asyncHandler(
		async (req: Request, res: Response) => {
			try {
				const register = await UserTask.register(req.body);
				res.status(200).json(register).end();
			} catch (error) {
				appLogger.log(
					'error',
					'AuthController.register',
					'Register request for user: %s',
					req.body.username,
					'failed with error: %s',
					error
				);
				throw error;
			} finally {
				appLogger.log('info', 'AuthController.register', 'Register request for user: %s', req.body.username);
			}
		}
	)

	public static refreshToken = AsyncMiddleware.asyncHandler(
		async (req: Request<unknown, unknown, RefreshTokenBody>, res: Response) => {
			try {
				const refreshToken = req.body.refreshToken;
				const userId = req.body.userId;
				const decodedToken = TokenService.verifyAuthToken(refreshToken, config.refreshSecret);
				if (!decodedToken) {
					throw new Unauthorized('invalid_refresh_token', 'Invalid refresh token', 'Invalid refresh token');
				}

				const checkTokenExists = await TokenService.queryToken({
					id: userId,
					token: refreshToken,
				});

				if (!checkTokenExists) {
					throw new Unauthorized('invalid_refresh_token', 'Invalid refresh token', 'Invalid refresh token');
				}

				const userType = decodedToken.payload?.type;
				if (!userId || !userType) {
					throw new Unauthorized('invalid_refresh_token', 'Invalid refresh token', 'Invalid refresh token');
				}

				const accessToken = await TokenService.generateAuthToken(userId, userType, config.sessionExpire);
				const response = new Success({
					accessToken: {
						token: accessToken,
						expire_access_token: config.sessionExpire,
						token_type: 'Bearer',
					},
				}).toJson

				return res.status(200).json(response).end();
			} catch (error) {
				appLogger.log('error', `Refresh token failed with error: ${error.errorMessage || error.message}`);
				throw error;
			}
		}
	)

	public static verifySession = AsyncMiddleware.asyncHandler(
		async (req: Request, res: Response) => {
			try {
				const accessToken = req.headers.authorization?.split(' ')[1];
				if (!accessToken) {
					throw new Unauthorized('invalid_access_token', 'Invalid access token', 'Invalid access token');
				}
				const decodedToken = TokenService.verifyAuthToken(accessToken, config.sessionSecret);
				if (!decodedToken) {
					throw new Unauthorized('invalid_access_token', 'Invalid access token', 'Invalid access token');
				}
				return res.status(200).json(decodedToken.payload).end();
			} catch (error: any) {
				appLogger.log('error',`Verify session failed with error: ${error.errorMessage || error.message}`);
				throw error;
			}
		}
	)
}