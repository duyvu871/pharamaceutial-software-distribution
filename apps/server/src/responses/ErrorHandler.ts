import Unauthorized from './clientErrors/Unauthorized';
import BadRequest from './clientErrors/BadRequest';
import NotFound from './clientErrors/NotFound';
import UnprocessableEntity from './clientErrors/UnprocessableEntity';
import InternalServerError from './serverErrors/InternalServerError';
import Forbidden from 'responses/clientErrors/Forbidden';

import { ICustomErrorResponse } from "../common/interfaces/responses";
import { Request, Response, NextFunction } from "express";

export default (err: Error | ICustomErrorResponse, req: Request, res: Response, next: NextFunction) => {
    if (res.headersSent) {
        return next();
    }

    console.log('name', err.constructor.name);

    if (
        err instanceof Unauthorized ||
        err instanceof BadRequest ||
        err instanceof NotFound ||
        err instanceof Unauthorized ||
        err instanceof UnprocessableEntity ||
        err instanceof InternalServerError ||
        err instanceof Forbidden
    ) {
        return reportCustomError(err, res);
    }

    if ('message' in err && err.message === 'Route not found') {
        return res.status(404).send("Route not found").end();
    }

    next(err);

}

const reportCustomError = (err: ICustomErrorResponse, res: Response) => {
    const { statusCode = 500 } = err;
    return res.status(statusCode).json({
        statusCode,
        errorCode: err.errorCode,
        errorDescription: err.errorDescription,
        errorMessage: err.errorMessage,
    }).end();
}