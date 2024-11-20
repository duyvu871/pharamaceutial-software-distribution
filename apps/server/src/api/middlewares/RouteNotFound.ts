import { Request, Response, NextFunction } from 'express';

const routeNotFound = (req: Request, res: Response, next: NextFunction) => {
    const error = new Error();
    error.message = "Route not found";
    // @ts-ignore
    error.statusCode = 404;
    next(error);
}

export default routeNotFound; 