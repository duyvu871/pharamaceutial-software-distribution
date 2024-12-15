import { Request, Response, NextFunction } from 'express';
import Unauthorized from 'responses/clientErrors/Unauthorized';
import { httpError } from 'server/common/enums/httpError';

const permissionMiddleware = (permissions: string[]) => {
	return (req: Request & {jwtPayload: Record<string, any>|any; scopes: string[]}, res: Response, next: NextFunction) => {
		const scopes = req.scopes;

		console.log('scopes', scopes);
		const hasPermission = permissions.some(permission => scopes.includes(permission));

		if (!hasPermission) {
			throw new Unauthorized('UNAUTHORIZED', httpError['NO_PERMISSION'], 'Bạn không có quyền truy cập vào tài nguyên này');
		}

		next();
	}
}

export default permissionMiddleware;