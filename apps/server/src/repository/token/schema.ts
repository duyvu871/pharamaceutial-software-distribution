import * as mongoose from "mongoose";
import Tokens from "server/configs/token";
import { z } from 'zod';
import dayjs from 'dayjs';
import { toJSON } from 'utils/plugins/mongo';
import { IDecodedToken } from 'server/common/interfaces/jsonwebtoken.ts';
import config from 'config/app-config';

const connection = mongoose;

export interface IToken extends mongoose.Document {
	aud: string;
	exp: Date;
	iat: Date;
	jti: string;
	nbf: Date;
	sub: string;
	token: string;
	type: string;
	blocked: boolean;
}

export interface ITokenModel extends mongoose.Model<IToken> {}

export interface ITokenDTO {
	aud: string;
	exp: Date;
	iat: Date;
	jti: string;
	nbf: Date;
	sub: string;
	token: string;
	type: string
	blocked: boolean;
}

export const tokenSchemaZod = z.object({
	user: z.string().min(1, 'User is required').trim(),
	type: z.string().min(1, 'Type is required').trim(),
	exp: z.date().min(new Date(), 'Expires must be greater than current date'),
	blacklisted: z.boolean().default(false),
});

const tokenSchema = new mongoose.Schema<IToken>({
	aud: { type: String, required: true, index: true },
	exp: { type: Date, required: true, default: dayjs().add(config.defaultExpire, 'seconds').toDate() },
	iat: { type: Date, required: true },
	jti: { type: String, required: true, index: true },
	nbf: { type: Date, required: true },
	sub: { type: String, required: true },
	token: { type: String, required: true },
	type: {
		type: String,
		required: true,
		enum: [Tokens.REFRESH, Tokens.RESET_PASSWORD, Tokens.VERIFY_EMAIL, Tokens.ACCESS]
	},
	blocked: { type: Boolean, default: false }
}, {
	timestamps: true,
	collection: 'tokens'
});

tokenSchema.plugin(toJSON);

const Token = connection.model<IToken, ITokenModel>('Token', tokenSchema);

export default Token;