import { sign, TokenExpiredError, verify } from 'jsonwebtoken';
import { VerifyTokenStatus } from 'server/common/constants';
import { IDecodedToken } from 'server/common/interfaces/jsonwebtoken';
import { JWTPayload } from 'types/auth';
import dayjs from 'dayjs';
import { getAuthPermission } from 'server/repository/permission';
import config from 'config/app-config';
import TokenModel, { IToken, ITokenDTO } from 'server/repository/token/schema';
import InternalServerError from 'responses/serverErrors/InternalServerError';
import Unauthorized from 'responses/clientErrors/Unauthorized';
import appLogger from 'utils/logger';
import BadRequest from 'responses/clientErrors/BadRequest';
import Token from 'server/configs/token';
import mongoose from 'mongoose';

export class TokenService {

	public static async queryToken(query: mongoose.RootFilterQuery<IToken>): Promise<ITokenDTO | null> {
		return TokenModel.findOne(query).exec();
	}

	/**
	 * Get a token from the database.
	 * @param token - The token string.
	 * @returns The token data.
	 */
	public static async getToken(token: string): Promise<ITokenDTO | null> {
		return TokenModel.findOne({
			token,
		}).exec();
	}

	public static compareToken = async (query: mongoose.RootFilterQuery<IToken>, token: string): Promise<boolean> => {
		try {
			const tokenFounded = await TokenModel.findOne(query).exec();
			if (!tokenFounded) {
				throw new Unauthorized('token_not_found', 'Token not found', 'Token not found');
			}
			return tokenFounded.token === token;
		} catch (error: any) {
			console.log(error);
			// throw new InternalServerError('failed_to_get_token', error.message, 'Failed to get token');
			return false;
		}
	}
	/**
	 * Save a token to the database.
	 * @param token - The token string.
	 * @param tokenPayload
	 * @returns The saved token data.
	 */
	public static async saveToken(
		token: string,
		tokenPayload: {
			aud: string;
			jti: string;
			sub: string;
			expiresIn: number;
			tokenType: string;
			isBlacklisted: boolean
		}
	): Promise<ITokenDTO> {
		try {
			const tokenData: ITokenDTO = {
				token: token,
				aud: tokenPayload.aud,
				exp: dayjs(tokenPayload.expiresIn).toDate(),
				iat: dayjs().toDate(),
				jti: tokenPayload.jti,
				nbf: dayjs().toDate(),
				sub: tokenPayload.sub,
				type: tokenPayload.tokenType,
				blocked:tokenPayload.isBlacklisted,
			};
			return await TokenModel.create(tokenData);
		} catch (error: any) {
			throw new InternalServerError('failed_to_save_token', error.message, 'Failed to save token');
		}
	}

	/**
	 * Delete a token from the database.
	 * @param token - The token string.
	 * @returns The number of deleted tokens.
	 */
	public static async deleteToken(token: string): Promise<number> {
		return (await TokenModel.deleteOne({
			token
		}).exec()).deletedCount;
	}

	public static async deleteTokenByUserId(userId: string, type: string, subject: string): Promise<number> {
		return (await TokenModel.deleteMany({
			aud: userId,
			type,
			sub: subject,
		}).exec()).deletedCount;
	}
	/**
	 * Verify the signature of a token.
	 * @param accessToken - The access token string.
	 * @param publicKey - The public key for verification.
	 * @returns The verification status.
	 */
	public static verifyTokenSignature = (accessToken: string, publicKey: string): VerifyTokenStatus => {
		if (accessToken === undefined || accessToken === null) {
			return VerifyTokenStatus.ACCESS_TOKEN_NOTFOUND;
		}

		try {
			verify(accessToken, publicKey, { algorithms: ["HS256"] });
			return VerifyTokenStatus.SUCCESS;
		} catch (err) {
			if (err instanceof TokenExpiredError) {
				return VerifyTokenStatus.TOKEN_EXPIRED;
			}

			return VerifyTokenStatus.SIGNATURE_VERIFICATION_FAILURE;
		}
	}

	/**
	 * Generate a token.
	 * @param payload - The payload data.
	 * @param secret - The secret key for signing the token.
	 * @returns The generated token string.
	 */
	public static generateToken = (
		payload: any,
		secret: string = process.env.APP_SECRET as string
	): string => {
		return sign(payload, secret, { algorithm: 'HS256' });
	}

	/**
	 * Generate an authentication token.
	 * @param userId - The user ID.
	 * @param userType - The type of the user (USER, MEMBERSHIP, ADMIN).
	 * @param expiresIn - The expiration time in seconds.
	 * @returns The generated authentication token string.
	 */
	public static generateAuthToken = async (
		userId: string,
		userType: "USER" | "MEMBERSHIP" | "ADMIN",
		expiresIn: number,
	): Promise<{token: string; expireIn: number}> => {
		try {
			const exp = dayjs().add(expiresIn, 'seconds').unix() * 1000;
			const payloadData: IDecodedToken<JWTPayload> = {
				payload: { id: userId.toString(), type: userType },
				iat: dayjs().unix() * 1000,
				exp: exp,
				aud: userId,
				jti: userId,
				sub: userType,
				nbf: dayjs().unix() * 1000,
				scopes: getAuthPermission(userType),
			};
			const generatedToken = this.generateToken(payloadData, config.sessionSecret);
			const deleted = await this.deleteTokenByUserId(userId, Token.ACCESS, userType);
			if (deleted > 0) {
				appLogger.info(`deleted_token ${Token.ACCESS} for user ${userId}`);
			}
			await this.saveToken(generatedToken, {
				aud: userId,
				jti: userId,
				sub: userType,
				expiresIn,
				tokenType: Token.ACCESS,
				isBlacklisted: false
			});
			return {
				token: generatedToken,
				expireIn: exp,
			};
		} catch (error: any) {
			appLogger.error(`failed_to_generate_auth_token ${error.message}`);
			throw new BadRequest('failed_to_generate_token', error.message, 'Failed to generate token');
		}
	}

	/**
	 * Verify an authentication token.
	 * @param token - The token string.
	 * @param publicKey - The public key for verification.
	 * @returns The decoded token data.
	 */
	public static verifyAuthToken = (token: string, publicKey: string): IDecodedToken<JWTPayload> => {
		try {
			return verify(token, publicKey, { algorithms: ["HS256"] }) as IDecodedToken<JWTPayload>;
		} catch (error: any) {
			throw new Unauthorized('failed_to_verify_token', error.message, 'Failed to verify token');
		}
	}

	/**
	 * Generate a refresh token.
	 * @param userId - The user ID.
	 * @param userType - The type of the user (USER, MEMBERSHIP, ADMIN).
	 * @param expiresIn - The expiration time in seconds.
	 * @returns The generated refresh token string.
	 */
	public static generateRefreshToken = async (
		userId: string,
		userType: "USER" | "MEMBERSHIP" | "ADMIN",
		expiresIn: number,
	): Promise<{token: string; expireIn: number}> => {
		try {
			const exp = dayjs().add(expiresIn, 'seconds').unix() * 1000;
			const payloadData: IDecodedToken<JWTPayload> = {
				payload: { id: userId.toString(), type: userType },
				iat: dayjs().unix() * 1000, // issued at
				exp: exp,
				aud: userId,
				jti: userId,
				sub: userType,
				nbf: dayjs().unix() * 1000, // not before
				scopes: getAuthPermission(userType),
			};
			const refreshToken = this.generateToken(payloadData, config.refreshSecret);
			const deleted = await this.deleteTokenByUserId(userId, Token.REFRESH, userType);
			if (deleted > 0) {
				appLogger.info(`deleted_token ${Token.REFRESH} for user ${userId}`);
			}
			await this.saveToken(refreshToken, {
				aud: userId,
				jti: userId,
				sub: userType,
				expiresIn: exp,
				tokenType: Token.REFRESH,
				isBlacklisted: false
			});
			return {
				token: refreshToken,
				expireIn: exp,
			};
		} catch (error: any) {
			appLogger.error(`failed_to_generate_token ${error.message}`);
			throw new InternalServerError('failed_to_generate_token', error.message, 'Failed to generate token');
		}
	}
}