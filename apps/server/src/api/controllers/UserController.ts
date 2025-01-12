import AsyncMiddleware from 'utils/asyncHandler';
import { UserTask } from 'server/repository/user';
import type { Request } from 'express';
import { ProfileQuery } from 'validations/User';
import Success from 'responses/successful/Success';
import { BranchAttributes } from 'server/repository/branch/schema';
import { UserAttributes } from 'repository/user/schema.ts';
import prisma from 'repository/prisma.ts';

export class UserController {
	public static getProfile = AsyncMiddleware.asyncHandler(
		async (req: Request<any, any, any, ProfileQuery> , res) => {
			try {
				const userId = req.query.id;
				const {jwtPayload} = req;
				let response;
				// console.log('jwtPayload', jwtPayload);
				// if (jwtPayload?.type === 'MEMBERSHIP') {
				// 	const membership = await prisma.memberships.findFirst({
				// 		where: {
				// 			id: userId
				// 		},
				// 		include: {
				// 			branches: true
				// 		}
				// 	});
				//
				// 	console.log('membership', membership);
				//
				// 	// const branches = await UserTask.getBranches(userId);
				// 	const response = new Success({
				// 		...membership,
				// 		branches: [membership?.branches]
				// 	}).toJson;
				// 	return res.status(200).json(response).end();
				// }
				// const tasks: any[] = [];
				// tasks.push(UserTask.getUserById(userId));
				// tasks.push(UserTask.getBranches(userId));
				// const [user, branches] = await Promise.all(tasks) as [UserAttributes, BranchAttributes[]];
				// // const branches = await UserTask.getBranches(userId);
				// const response = new Success({
				// 	...(user),
				// 	...({id: userId}),
				// 	branches
				// }).toJson;
				// return res.status(200).json(response).end();
					if (jwtPayload?.type === 'USER') {
						const user = await prisma.users.findUnique({
							where: { id: userId },
							include: { branches: true }, // Giả định relation name là branches
						});
						if (!user) return null;
						response = {
							id: user.id,
							phone_number: user.phone_number || null,
							username: user.username,
							email: user.email || null,
							age: user.age || null,
							address: user.address || null,
							avatar: user.avatar || null,
							notes: user.notes || null,
							is_active: user.is_active,
							last_login: user.last_login?.toISOString() || null,
							permission: user.permission,
							branches: user.branches.map(branch => ({ id: branch.branch_id, name: branch.branch_name })), // Map dữ liệu branch
						};
					} else if (jwtPayload?.type === 'MEMBERSHIP') {
						const membership = await prisma.memberships.findUnique({
							where: { id: userId },
							include: { branches: true },
						});
						if (!membership) return null;
						response = {
							id: membership.id,
							phone_number: membership.phone_number || null,
							username: membership.username,
							email: membership.email || null,
							age: null,
							address: null,
							avatar: membership.avatar || null,
							notes: membership.notes || null,
							is_active: membership.employee_status === 'active',
							last_login: null,
							permission: membership.permission,
							branches: membership.branches ? [membership.branches] : [], // Map dữ liệu branch
						};
					}
					const successResponse = new Success(response).toJson;
					return res.status(200).json(successResponse).end();
			} catch (error) {
				throw error;
			}
		}
	);
}