import AsyncMiddleware from 'utils/asyncHandler';
import { UserTask } from 'server/repository/user';
import type { Request } from 'express';
import { ProfileQuery, ResetPassword, UpdateProfile } from 'validations/User';
import Success from 'responses/successful/Success';
import { BranchAttributes } from 'server/repository/branch/schema';
import { UserAttributes } from 'repository/user/schema.ts';
import prisma from 'repository/prisma.ts';
import BadRequest from 'responses/clientErrors/BadRequest.ts';

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
							branches: user.branches, // Map dữ liệu branch
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
							age: membership.age,
							address: membership.address,
							avatar: membership.avatar || null,
							notes: membership.notes || null,
							is_active: membership.employee_status === 'active',
							last_login: membership.last_login,
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

	public static updateProfile = AsyncMiddleware.asyncHandler(
		async (req: Request<any, any, UpdateProfile, any>, res) => {
			const { id, role, profileUpdate } = req.body;
			const authType = req.jwtPayload?.type;

			let responseData;
			try {
				if ((authType === 'MEMBERSHIP' || authType === 'USER') && role === 'membership') {
					const membershipUpdate = await prisma.memberships.update({
						where: { id },
						data: {
							phone_number: profileUpdate.phone_number,
							username: profileUpdate.username,
							email: profileUpdate.email,
							age: profileUpdate.age,
							address: profileUpdate.address,
							avatar: profileUpdate.avatar,
							notes: profileUpdate.notes,
						},
					});
					responseData = membershipUpdate
				} else if (authType === 'USER' && role === 'user') {
					const userUpdate = await prisma.users.update({
						where: { id },
						data: {
							phone_number: profileUpdate.phone_number,
							username: profileUpdate.username,
							email: profileUpdate.email,
							age: profileUpdate.age,
							address: profileUpdate.address,
							avatar: profileUpdate.avatar,
							notes: profileUpdate.notes,
						},
					});
					responseData = userUpdate
				}
				if (!responseData) {
					throw new BadRequest("update_profile_failed", "Cập nhật thông tin thất bại", "Cập nh��t thông tin thất bại");
				}
				const response = new Success(responseData).toJson;
				return res.status(200).json(response).end();
			} catch (error) {
				throw error;
			}
		}
	)

	public static resetPassword = AsyncMiddleware.asyncHandler(
		async (req: Request<any, any, ResetPassword, any>, res) => {
			const { id, role, password } = req.body;
			const authType = req.jwtPayload?.type;

			let responseData;
			try {
				if ((authType === 'MEMBERSHIP' || authType === 'USER') && role === 'membership') {
					const hashPassword = await UserTask.generateHash(password);
					const membershipUpdate = await prisma.memberships.update({
						where: { id },
						data: {
							password: hashPassword
						},
					});
					responseData = {
						message: 'Password updated successfully'
					}
				} else if (authType === 'USER' && role === 'user') {
					const hashPassword = await UserTask.generateHash(password);
					const userUpdate = await prisma.users.update({
						where: { id },
						data: {
							password: hashPassword
						},
					});
					responseData = {
						message: 'Password updated successfully'
					}
				}
				if (!responseData) {
					throw new BadRequest("reset_pwd_failed", "Cập nhật mật khẩu thất bại", "Cập nhật mật khẩu thất bại");
				}
				const response = new Success(responseData).toJson;
				return res.status(200).json(response).end();
			} catch (error) {
				throw error;
			}
		}
	)
}