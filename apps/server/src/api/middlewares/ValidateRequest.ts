// import { Request, Response, NextFunction } from 'express';
// import { ZodError, ZodObject } from 'zod';
// import { HttpStatusCode } from 'server/common/httpStatusCode';
// import appLogger from 'utils/logger';
// import InternalServerError from 'responses/serverErrors/InternalServerError';
// import BadRequest from 'responses/clientErrors/BadRequest';
//
// type ValidateType = 'body' | 'headers' | 'query' | 'params';
//
// export const validate = (type: ValidateType, schema: ZodObject<any>) => {
// 	return (req: Request, res: Response, next: NextFunction) => {
// 		try {
// 			const DTOToValidate = Object.keys(schema.shape).reduce((acc, key) => {
// 				if (req[type][key]) {
// 					acc[key] = req[type][key];
// 				}
// 				return acc;
// 			}, {} as Record<string, string | string[] | undefined>);
//
// 			schema.parse(DTOToValidate);
//
// 			next();
// 		} catch (error) {
// 			if (error instanceof ZodError) {
// 				const errorMessage = error.errors.map((err) => {
// 					const field = err.path[0];
// 					const message = schema.shape[field]?.invalid ? schema.shape[field]?.invalid(undefined) : err.message;
// 					return `Field ${field}: ${message}`;
// 				}).join(', ');
//
// 				throw new BadRequest('BAD_REQUEST', 'Bad request', errorMessage);
// 				// return res.status(HttpStatusCode.BadRequest).json({
// 				// 	message: `${type} validation failed`,
// 				// 	errors: errorMessage,
// 				// });
// 			}
// 			appLogger.error('validate middleware error:', error);
// 			throw new InternalServerError('INTERNAL_SERVER_ERROR', 'Internal server error', 'Internal server error');
// 			// return res.status(HttpStatusCode.InternalServerError).json({ message: 'Internal server error' });
// 		}
// 	};
// };
//
// export const validateBody = (schema: ZodObject<any>) => validate('body', schema);
// export const validateHeader = (schema: ZodObject<any>) => validate('headers', schema);
// export const validateQuery = (schema: ZodObject<any>) => validate('query', schema);
// export const validateParams = (schema: ZodObject<any>) => validate('params', schema);


import { Request, Response, NextFunction } from 'express';
import { ZodError, ZodObject, ZodType } from 'zod';
import { HttpStatusCode } from 'server/common/httpStatusCode';
import appLogger from 'utils/logger';
import InternalServerError from 'responses/serverErrors/InternalServerError';
import BadRequest from 'responses/clientErrors/BadRequest';

type ValidateType = 'body' | 'headers' | 'query' | 'params';

const validate = (type: ValidateType, ...schemas: ZodType<any>[]) => {
	return (req: Request, res: Response, next: NextFunction) => {
		try {
			if (!schemas || schemas.length === 0) {
				return next();
			}

			let validatedData: Record<string, string | string[] | undefined> = {};

			for (const schema of schemas) {
				if (schema instanceof ZodObject) {
					const DTOToValidate = Object.keys(schema.shape).reduce((acc, key) => {
						if (req[type][key]) {
							acc[key] = req[type][key];
						}
						return acc;
					}, {} as Record<string, string | string[] | undefined>);

					schema.parse(DTOToValidate);
					validatedData = { ...validatedData, ...DTOToValidate };
				}
			}

			next();

		} catch (error) {
			if (error instanceof ZodError) {
				for (const schema of schemas){
					if (schema instanceof ZodObject){
						const errorMessage = error.errors.map((err) => {
							const field = err.path[0];
							const message = schema.shape[field]?.invalid ? schema.shape[field]?.invalid(undefined) : err.message;
							return `Field ${field} in ${type}: ${message}`;
							// throw new BadRequest('BAD_REQUEST', 'Bad request', message);
							// return message;
						}).join(', ');
						throw new BadRequest('BAD_REQUEST', 'Bad request', errorMessage);
					}
				}
			}
			appLogger.error('validate middleware error:', error);
			throw new InternalServerError('INTERNAL_SERVER_ERROR', 'Internal server error', 'Internal server error');
		}
	};
};

export const validateBody = (...schemas: ZodType<any>[]) => validate('body', ...schemas);
export const validateHeader = (...schemas: ZodType<any>[]) => validate('headers', ...schemas);
export const validateQuery = (...schemas: ZodType<any>[]) => validate('query', ...schemas);
export const validateParams = (...schemas: ZodType<any>[]) => validate('params', ...schemas);