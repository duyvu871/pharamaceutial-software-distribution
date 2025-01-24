import { Request, Response, NextFunction } from 'express';
import Unauthorized from 'responses/clientErrors/Unauthorized';
import { httpError } from 'server/common/enums/httpError';
import { JWTPayload, Permissions } from 'types/auth.ts';

const permissionMiddleware = (permissions: string[]) => {
	return (
		req: Request & { jwtPayload: Record<string, any> | any; scopes: string[] },
		res: Response,
		next: NextFunction
	) => {
		const scopes = req.scopes;

		console.log('scopes', scopes);

		const hasPermission = permissions.some((permission) => {
			const [role, action] = permission.split('.') as [
				JWTPayload['type'],
				Permissions,
			];

			if (action === 'All') {
				// Check if any scope includes the role (e.g., 'Admin.All' matches 'Admin' in 'scopes')
				return scopes.some((scope) => scope.startsWith(role + '.'));
			} else {
				// Check if any scope includes the permission (e.g., 'Admin.Read' matches 'Admin.Read' in 'scopes')
				return scopes.includes(permission);
			}
		});

		if (!hasPermission) {
			throw new Unauthorized(
				'UNAUTHORIZED',
				httpError['NO_PERMISSION'],
				'Bạn không có quyền truy cập vào tài nguyên này'
			);
		}

		next();
	};
};

export default permissionMiddleware;