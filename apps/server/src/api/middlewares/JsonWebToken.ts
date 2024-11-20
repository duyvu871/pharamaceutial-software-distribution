import Unauthorized from '../../responses/clientErrors/Unauthorized';

import { decode } from 'jsonwebtoken';
import { NextFunction, Request, Response } from 'express';
import { ErrorDescription } from '../../common/constants';
import { IDecodedToken } from '../../common/interfaces/jsonwebtoken';

const JsonWebToken = (req: Request, res: Response, next: NextFunction) => {

    const { headers } = req;
    if (!headers['authorization']) {
        throw new Unauthorized(
            "UNAUTHORIZED",
            ErrorDescription.UNAUTHORIZED,
            "access token is required"
        );
    }

    const accessToken: string = headers.authorization.replace('Bearer', '').trim();
    const decodedToken: IDecodedToken = decode(accessToken) as IDecodedToken;

    if (decodedToken === null) {
        throw new Unauthorized(
            'INVALID_TOKEN_FORMAT',
            ErrorDescription.UNAUTHORIZED,
            'invalid token'
        );
    }

    if (decodedToken.aud === undefined) {
        throw new Unauthorized('INVALID_AUDIENCE', ErrorDescription.UNAUTHORIZED, 'audience is required');
    }
    if (decodedToken.jti === undefined) {
        throw new Unauthorized('INVALID_JWT_ID', ErrorDescription.UNAUTHORIZED, 'jwt id is required');
    }
    // expired token
    if (decodedToken.exp && Date.now() >= decodedToken.exp) {
        throw new Unauthorized('EXPIRED_TOKEN', ErrorDescription.UNAUTHORIZED, 'token has expired');
    }
    // not before token
    if (decodedToken.nbf && Date.now() < decodedToken.nbf) {
        throw new Unauthorized('TOKEN_NOT_YET_VALID', ErrorDescription.UNAUTHORIZED, 'token is not yet valid');
    }

    req.jwtPayload = decodedToken.payload;

    next();
}

export default JsonWebToken;