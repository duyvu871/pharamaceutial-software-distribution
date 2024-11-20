import { sign, TokenExpiredError, verify } from 'jsonwebtoken';
import { VerifyTokenStatus } from 'server/common/constants';
import { IDecodedToken } from 'server/common/interfaces/jsonwebtoken';
import { JWTPayload } from 'types/auth';
import dayjs from 'dayjs';
import { getAuthPermission } from 'server/repository/permission';
import config from 'config/app-config';
import TokenModel, { ITokenDTO } from 'server/repository/token/schema';
import InternalServerError from 'responses/serverErrors/InternalServerError';
import Unauthorized from 'responses/clientErrors/Unauthorized';
import appLogger from 'utils/logger';
import BadRequest from 'responses/clientErrors/BadRequest';
import Token from 'server/configs/token';

export class TokenService {
	/**
	 * Save a token to the database.
	 * @param token - The token string.
	 * @param userId - The user ID associated with the token.
	 * @param expiresIn - The expiration time in seconds.
	 * @param tokenType - The type of the token.
	 * @param isBlacklisted - Whether the token is blacklisted.
	 * @returns The saved token data.
	 */
	public static async saveToken(token: string, userId: string, expiresIn: number, tokenType: string, isBlacklisted: boolean = false): Promise<ITokenDTO> {
		try {
			const tokenData: ITokenDTO = {
				token: token,
				aud: userId,
				exp: dayjs().add(expiresIn, 'seconds').toDate(),
				iat: dayjs().toDate(),
				jti: userId,
				nbf: dayjs().toDate(),
				sub: userId,
				type: tokenType,
				blocked: isBlacklisted,
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
		return (await TokenModel.deleteOne({ token }).exec()).deletedCount;
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
	): Promise<string> => {
		try {
			const payloadData: IDecodedToken<JWTPayload> = {
				payload: { id: userId.toString(), type: userType },
				iat: dayjs().unix(),
				exp: dayjs().add(expiresIn, 'seconds').unix(),
				jti: userId,
				sub: userId,
				nbf: dayjs().unix(),
				scopes: getAuthPermission(userType),
			};
			const generatedToken = this.generateToken(payloadData, config.sessionSecret);
			await this.saveToken(generatedToken, userId, expiresIn, Token.ACCESS);
			return generatedToken;
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
	): Promise<string> => {
		try {
			const payloadData: IDecodedToken<JWTPayload> = {
				payload: { id: userId.toString(), type: userType },
				iat: dayjs().unix(),
				exp: dayjs().add(expiresIn, 'seconds').unix(),
				jti: userId,
				sub: userId,
				nbf: dayjs().unix(),
				scopes: getAuthPermission(userType),
			};
			const refreshToken = this.generateToken(payloadData, config.refreshSecret);
			await this.saveToken(refreshToken, userId, expiresIn, Token.REFRESH);
			return refreshToken;
		} catch (error: any) {
			appLogger.error(`failed_to_generate_token ${error.message}`);
			throw new InternalServerError('failed_to_generate_token', error.message, 'Failed to generate token');
		}
	}
}