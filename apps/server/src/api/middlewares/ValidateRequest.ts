import { Request, Response, NextFunction } from 'express';
import { ZodError, ZodObject } from 'zod';
import { HttpStatusCode } from 'server/common/httpStatusCode';
import appLogger from 'utils/logger';

type ValidateType = 'body' | 'headers' | 'query' | 'params';

export const validate = (type: ValidateType, schema: ZodObject<any>) => {
	return (req: Request, res: Response, next: NextFunction) => {
		try {
			const DTOToValidate = Object.keys(schema.shape).reduce((acc, key) => {
				if (req[type][key]) {
					acc[key] = req[type][key];
				}
				return acc;
			}, {} as Record<string, string | string[] | undefined>);

			schema.parse(DTOToValidate);

			next();
		} catch (error) {
			if (error instanceof ZodError) {
				const errorMessage = error.errors.map((err) => {
					const field = err.path[0];
					const message = schema.shape[field]?.invalid ? schema.shape[field]?.invalid(undefined) : err.message;
					return `Field ${field}: ${message}`;
				}).join(', ');
				return res.status(HttpStatusCode.BadRequest).json({
					message: `${type} validation failed`,
					errors: errorMessage,
				});
			}
			appLogger.error('validate middleware error:', error);
			return res.status(HttpStatusCode.InternalServerError).json({ message: 'Internal server error' });
		}
	};
};

export const validateBody = (schema: ZodObject<any>) => validate('body', schema);
export const validateHeader = (schema: ZodObject<any>) => validate('headers', schema);
export const validateQuery = (schema: ZodObject<any>) => validate('query', schema);
export const validateParams = (schema: ZodObject<any>) => validate('params', schema);
