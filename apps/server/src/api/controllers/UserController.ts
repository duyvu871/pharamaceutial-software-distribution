import AsyncMiddleware from 'utils/asyncHandler';
import { UserSchema, UserTask } from 'server/repository/user';
import type { Request } from 'express';
import { ProfileQuery } from 'validations/User';
import Success from 'responses/successful/Success';
import { BranchAttributes } from 'server/repository/branch/schema';


export class UserController {
	public static getProfile = AsyncMiddleware.asyncHandler(
		async (req: Request<any, any, any, ProfileQuery> , res) => {
			try {
				const userId = req.query.id;
				const tasks: any[] = [];
				tasks.push(UserTask.getUserById(userId));
				tasks.push(UserTask.getBranches(userId));
				const [user, branches] = await Promise.all(tasks) as [UserSchema, BranchAttributes[]];
				// const branches = await UserTask.getBranches(userId);
				const response = new Success({
					...(user.dataValues),
					branches
				}).toJson;
				return res.status(200).json(response).end();
			} catch (error) {
				throw error;
			}
		}
	);
}