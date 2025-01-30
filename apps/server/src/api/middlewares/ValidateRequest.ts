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


// import { Request, Response, NextFunction } from 'express';
// import { ZodError, ZodObject, ZodType } from 'zod';
// import { HttpStatusCode } from 'server/common/httpStatusCode';
// import appLogger from 'utils/logger';
// import InternalServerError from 'responses/serverErrors/InternalServerError';
// import BadRequest from 'responses/clientErrors/BadRequest';
//
// type ValidateType = 'body' | 'headers' | 'query' | 'params';
//
// const validate = (type: ValidateType, ...schemas: ZodType<any>[]) => {
// 	return (req: Request, res: Response, next: NextFunction) => {
// 		try {
// 			if (!schemas || schemas.length === 0) {
// 				return next();
// 			}
//
// 			let validatedData: Record<string, string | string[] | undefined> = {};
//
// 			for (const schema of schemas) {
// 				if (schema instanceof ZodObject) {
// 					const DTOToValidate = Object.keys(schema.shape).reduce((acc, key) => {
// 						if (key in req[type]) {
// 							acc[key] = req[type][key];
// 						}
// 						return acc;
// 					}, {} as Record<string, string | string[] | undefined>);
// 					console.log('DTOToValidate: ', DTOToValidate);
// 					const schemaParse = schema.parse(DTOToValidate);
// 					console.log('schemaParse: ', schemaParse);
// 					validatedData = { ...validatedData, ...DTOToValidate, ...schemaParse };
// 				}
// 			}
//
// 			console.log(`req[${type}] validatedData: `, validatedData);
// 			req[type] = validatedData;
//
// 			next();
//
// 		} catch (error) {
// 			if (error instanceof ZodError) {
// 				for (const schema of schemas){
// 					if (schema instanceof ZodObject){
// 						const errorMessage = error.errors.map((err) => {
// 							const field = err.path[0];
// 							const message = schema.shape[field]?.invalid ? schema.shape[field]?.invalid(undefined) : err.message;
// 							return `Field ${field} in ${type}: ${message}`;
// 							// throw new BadRequest('BAD_REQUEST', 'Bad request', message);
// 							// return message;
// 						}).join(', ');
// 						throw new BadRequest('BAD_REQUEST', 'Bad request', errorMessage);
// 					}
// 				}
// 			}
// 			appLogger.error('validate middleware error:', error);
// 			throw new InternalServerError('INTERNAL_SERVER_ERROR', 'Internal server error', 'Internal server error');
// 		}
// 	};
// };
//
// export const validateBody = (...schemas: ZodType<any>[]) => validate('body', ...schemas);
// export const validateHeader = (...schemas: ZodType<any>[]) => validate('headers', ...schemas);
// export const validateQuery = (...schemas: ZodType<any>[]) => validate('query', ...schemas);
// export const validateParams = (...schemas: ZodType<any>[]) => validate('params', ...schemas);

import { Request, Response, NextFunction } from 'express';
import { ZodError, ZodType, ZodObject, ZodEffects } from 'zod';
import { HttpStatusCode } from 'server/common/httpStatusCode';
import appLogger from 'utils/logger';
import InternalServerError from 'responses/serverErrors/InternalServerError';
import BadRequest from 'responses/clientErrors/BadRequest';

type ValidateType = 'body' | 'headers' | 'query' | 'params';
type ValidatedData = Record<string, unknown>;

const validate = (type: ValidateType, ...schemas: ZodType<any>[]) => {
	return (req: Request, res: Response, next: NextFunction) => {
		try {
			if (!schemas.length) return next();

			const rawData = req[type];
			let mergedData: ValidatedData = {};

			for (const schema of schemas) {
				const result = schema.safeParse(rawData);

				if (!result.success) {
					const errorMessages = result.error.errors.map((err) => {
						const path = err.path.join('.');
						const message = err.message;
						return `${path} (${type}): ${message}`;
					});

					throw new BadRequest(
						'VALIDATION_ERROR',
						'Invalid request data',
						errorMessages.join(', ')
					);
				}

				console.log(`req[${type}] validatedData: `, result.data);

				mergedData = { ...mergedData, ...result.data };
			}

			console.log(`req[${type}] validatedData: `, mergedData);

			req[type] = mergedData;
			next();
		} catch (error) {
			if (error instanceof BadRequest) {
				appLogger.warn(`Validation error [${type}]: ${error.message}`);
				return next(error);
			}

			if (error instanceof ZodError) {
				const errorMessages = error.errors.map((err) =>
					`${err.path.join('.')} (${type}): ${err.message}`
				);

				const validationError = new BadRequest(
					'VALIDATION_ERROR',
					'Invalid request data',
					errorMessages.join(', ')
				);

				appLogger.warn(`Zod validation error [${type}]: ${validationError.message}`);
				return next(validationError);
			}

			appLogger.error('Unexpected validation error:', error);
			next(new InternalServerError(
				'INTERNAL_VALIDATION_ERROR',
				'Validation processing failed',
				'An unexpected error occurred during validation'
			));
		}
	};
};

// Type-safe factory functions
export const validateBody = (...schemas: ZodType<any>[]) => validate('body', ...schemas);
export const validateHeader = (...schemas: ZodType<any>[]) => validate('headers', ...schemas);
export const validateQuery = (...schemas: ZodType<any>[]) => validate('query', ...schemas);
export const validateParams = (...schemas: ZodType<any>[]) => validate('params', ...schemas);