import { NextFunction, Response, Request } from "express";
import BadRequest from 'responses/clientErrors/BadRequest.ts';
import { AdminTask } from 'repository/admin/task.ts';
import AsyncMiddleware from 'utils/asyncHandler.ts';

export const HighEndProtected =  AsyncMiddleware.asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
	const jwtPayload = req.jwtPayload;
	const id = jwtPayload?.id as string;
	const userType = jwtPayload?.type as "MEMBERSHIP" | "USER" | "ADMIN";

	if (userType !== "ADMIN") {
		console.log(`User type ${userType} id ${id} is not an admin, cannot create another admin`);
		throw new BadRequest("internal_error", "Internal server error", "Internal server error");
	}

	const isHighEndAdmin = await AdminTask.isAdminHighEnd(id);
	if (!isHighEndAdmin) {
		console.log(`User id ${id} is not a high end admin, cannot create another admin`);
		throw new BadRequest("internal_error", "Tài khoản của bạn không có quyền tạo admin", "Tài khoản của bạn không có quyền tạo admin");
	}

	next();
});