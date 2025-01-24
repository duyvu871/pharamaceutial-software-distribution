import AsyncMiddleware from "server/utils/asyncHandler";
import { Request, Response } from "express";
import { AdminTask } from 'repository/admin/task.ts';
import BadRequest from 'responses/clientErrors/BadRequest.ts';
import { PaginationQueryV2 } from 'validations/Pagination.ts';
import { transformExpressParamsForPrismaWithTimeRangeBase } from 'server/shared/pagination-parse.ts';
import prisma from 'repository/prisma.ts';
import Success from "server/responses/successful/Success";
import { AdminCreation, AdminIdParam, UserCreation } from 'validations/Admin.ts';
import AuthService from 'services/AuthService.ts';
import { SubscriptionService } from 'services/SubcriptionService.ts';
import { CreateBranchBody } from 'validations/Branch.ts';

export class AdminController {
	public static createOtherAdmin = AsyncMiddleware.asyncHandler(
		async (req: Request<any, any, AdminCreation>, res: Response) => {
			try {
				const admin = req.body;
				const jwtPayload = req.jwtPayload;

				const userId = jwtPayload?.id as string;
				const userType = jwtPayload?.type as "MEMBERSHIP" | "USER" | "ADMIN";

				if (userType !== "ADMIN") {
					console.log(`User type ${userType} id ${userId} is not an admin, cannot create another admin`);
					throw new BadRequest("internal_error", "Internal server error", "Internal server error");
				}

				const isHighEndAdmin = await AdminTask.isAdminHighEnd(userId);

				if (!isHighEndAdmin) {
					console.log(`User id ${userId} is not a high end admin, cannot create another admin`);
					throw new BadRequest("internal_error", "Tài khoản của bạn không có quyền tạo admin", "Tài khoản của bạn không có quyền tạo admin");
				}

				const passwordHashed = await AuthService.hashPassword(admin.password);
				const newAdmin = await prisma.admins.create({
					data: {
						...admin,
						password: passwordHashed,
					},
				});
				res.status(200).json(newAdmin).end();
			} catch (error) {
				throw error;
			}
		}
	)

	public static getAdmin = AsyncMiddleware.asyncHandler(
		async (req: Request<any, any, any, PaginationQueryV2>, res: Response) => {
			try {
				console.log("req.query", req.query);
				const parsedQuery = transformExpressParamsForPrismaWithTimeRangeBase("admins", req.query, prisma);

				const total = await prisma.admins.count({
					...parsedQuery,
				});

				const admins = await prisma.admins.findMany({
					...parsedQuery,
					omit: {
						password: true,
					},
					include: {
						admin_subsciption: {
							include: {
								admin_plans: true,
							}
						}
					},
				});

				const response = new Success({
					data: admins,
					total,
					page: Number(req.query.page),
					totalPage: Math.ceil(total / Number(req.query.limit || 10)),
				}).toJson;
				return res.status(200).json(response).end();
			} catch (error) {
				throw error;
			}
		}
	)

	public static getAdminById = AsyncMiddleware.asyncHandler(
		async (req: Request<AdminIdParam, any, any>, res: Response) => {
			try {
				const adminId = req.params.adminId;
				const jwtPayload = req.jwtPayload;

				const isHighEndAdmin = await AdminTask.isAdminHighEnd(adminId);
				if ((!isHighEndAdmin && jwtPayload?.id !== adminId) || jwtPayload?.type !== "ADMIN") {
					console.log(`User id ${jwtPayload?.id} is not a high end admin, cannot update another admin`);
					throw new BadRequest("internal_error", "Tài khoản của bạn không có quyền cập nhật admin", "Tài khoản của bạn không có quyền cập nhật admin");
				}

				const admin = await prisma.admins.findUnique({
					where: {
						id: adminId,
					}
				});
				if (!admin) {
					throw new BadRequest("admin_not_found", "Admin not found", "Admin not found");
				}
				return res.status(200).json(admin).end();
			} catch (error) {
				throw error;
			}
		}
	)

	public static updateAdmin = AsyncMiddleware.asyncHandler(
		async (req: Request<AdminIdParam, any, any>, res: Response) => {
			try {
				const adminId = req.params.adminId;
				const admin = req.body;
				const jwtPayload = req.jwtPayload;

				const isHighEndAdmin = await AdminTask.isAdminHighEnd(adminId);

				if ((!isHighEndAdmin && jwtPayload?.id !== adminId) || jwtPayload?.type !== "ADMIN") {
					console.log(`User id ${jwtPayload?.id} is not a high end admin, cannot update another admin`);
					throw new BadRequest("internal_error", "Tài khoản của bạn không có quyền cập nhật admin", "Tài khoản của bạn không có quyền cập nhật admin");
				}

				const updatedAdmin = await prisma.admins.update({
					where: {
						id: adminId,
					},
					data: {
						...admin,
					}
				});
				return res.status(200).json(updatedAdmin).end();
			} catch (error) {
				throw error;
			}
		}
	)

	public static checkHighEndAdmin = AsyncMiddleware.asyncHandler(
		async (req: Request<any, any, any>, res: Response) => {
			try {
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
				const response = new Success(isHighEndAdmin).toJson;
				return res.status(200).json(response).end();
			} catch (error) {
				throw error;
			}
		}
	)

	public static getUserSlaves = AsyncMiddleware.asyncHandler(
		async (req: Request<any, any, any, PaginationQueryV2>, res: Response) => {
			try {
				const jwtPayload = req.jwtPayload;
				const id = jwtPayload?.id as string;
				const userType = jwtPayload?.type as "MEMBERSHIP" | "USER" | "ADMIN";
				const parsedQuery = transformExpressParamsForPrismaWithTimeRangeBase("users", req.query, prisma);

				if (userType !== "ADMIN") {
					console.log(`User type ${userType} id ${id} is not an admin, cannot create another admin`);
					throw new BadRequest("internal_error", "Internal server error", "Internal server error");
				}

				const isHighEndAdmin = await AdminTask.isAdminHighEnd(id);
				if (isHighEndAdmin) {
					const count = await prisma.users.count({
						...parsedQuery,
					});
					const users = await prisma.users.findMany({
						...parsedQuery,
						omit: {
							password: true,
						}
					});
					const response = new Success({
						data: users,
						total: count,
						page: Number(req.query.page),
						totalPage: Math.ceil(count / Number(req.query.limit || 10)),
					}).toJson;
					return res.status(200).json(response).end();
				}

				const count = await prisma.users.count({
					where: {
						...parsedQuery.where,
						admin_to_user: {
							some: {
								adminId: id,
							}
						}
					}
				});

				const users = await prisma.users.findMany({
					...parsedQuery,
					where: {
						...parsedQuery.where,
						admin_to_user: {
							some: {
								adminId: id,
							}
						}
					},
					omit: {
						password: true,
					}
				});

				const response = new Success({
					data: users,
					total: count,
					page: Number(req.query.page),
					totalPage: Math.ceil(count / Number(req.query.limit || 10)),
				}).toJson;
				return res.status(200).json(response).end();
			} catch (error) {
				throw error;
			}
		}
	)

	public static createOrUpdateUserSlave = AsyncMiddleware.asyncHandler(
		async (
			req: Request<
				any,
				any,
				ConditionalRequired<UserCreation, "id", "password"|"username">,
				any
			>,
			res: Response
		) => {
			try {
				const jwtPayload = req.jwtPayload;
				const id = jwtPayload?.id as string;
				const userType = jwtPayload?.type as "MEMBERSHIP" | "USER" | "ADMIN";
				const user = req.body;

				if (userType !== "ADMIN") {
					console.log(`User type ${userType} id ${id} is not an admin, cannot create another admin`);
					throw new BadRequest("internal_error", "Internal server error", "Internal server error");
				}

				if (user.id) {
					const password = user.password ? await AuthService.hashPassword(user.password) : undefined;
					const updatedUser = await prisma.users.update({
						where: {
							id: user.id,
						},
						data: {
							...user,
							password
						}
					});
					const response = new Success(updatedUser).toJson;
					return res.status(200).json(response).end();
				} else {
					const passwordHashed = await AuthService.hashPassword(user.password);
					const newUser = await prisma.users.create({
						data: {
							...user,
							password: passwordHashed,
						},
					});
					const adminToUser = await prisma.admin_to_user.create({
						data: {
							adminId: id,
							userId: newUser.id,
						}
					});

					const response = new Success(newUser).toJson;
					return res.status(200).json(response).end();
				}

			} catch (error) {
				throw error;
			}
		}
	)

	public static getBranches = AsyncMiddleware.asyncHandler(
		async (req: Request<any, any, any, PaginationQueryV2>, res: Response) => {
			try {
				const jwtPayload = req.jwtPayload;
				const id = jwtPayload?.id as string;
				const userType = jwtPayload?.type as "MEMBERSHIP" | "USER" | "ADMIN";
				const parsedQuery = transformExpressParamsForPrismaWithTimeRangeBase("branches", req.query, prisma);

				if (userType !== "ADMIN") {
					console.log(`User type ${userType} id ${id} is not an admin, cannot create another admin`);
					throw new BadRequest("internal_error", "Internal server error", "Internal server error");
				}

				const isHighEndAdmin = await AdminTask.isAdminHighEnd(id);
				if (isHighEndAdmin) {
					const count = await prisma.branches.count({
						...parsedQuery,
					});
					const branches = await prisma.branches.findMany({
						...parsedQuery,
						include: {
							users: {
								omit: {
									password: true,
								}
							},
							subscriptions: {
								include: {
									branch_plans: true,
								}
							}
						}
					});
					const response = new Success({
						data: branches,
						total: count,
						page: Number(req.query.page),
						totalPage: Math.ceil(count / Number(req.query.limit || 10)),
					}).toJson;
					return res.status(200).json(response).end();
				}

				const query = {
					...parsedQuery,
					where: {
						...parsedQuery.where,
						users: {
							admin_to_user: {
								some: {
									adminId: id,
								}
							}
						}
					},
					include: {
						users: {
							omit: {
								password: true,
							}
						},
						subscriptions: {
							include: {
								branch_plans: true,
							}
						}
					}
				}

				const count = await prisma.branches.count({
					where: query.where,
				});

				const branches = await prisma.branches.findMany(query);

				const response = new Success({
					data: branches,
					total: count,
					page: Number(req.query.page),
					totalPage: Math.ceil(count / Number(req.query.limit || 10)),
				}).toJson;
				return res.status(200).json(response).end();
			} catch (error) {
				throw error;
			}
		}
	)

	public static setPlanToBranch = AsyncMiddleware.asyncHandler(
		async (req: Request<any, any, any>, res: Response) => {
			try {
				const jwtPayload = req.jwtPayload;
				const id = jwtPayload?.id as string;
				const userType = jwtPayload?.type as "MEMBERSHIP" | "USER" | "ADMIN";
				const { branchId, planId } = req.body;

				if (userType !== "ADMIN") {
					console.log(`User type ${userType} id ${id} is not an admin, cannot create another admin`);
					throw new BadRequest("internal_error", "Internal server error", "Internal server error");
				}

				const isHighEndAdmin = await AdminTask.isAdminHighEnd(id);
				if (!isHighEndAdmin) {
					console.log(`User id ${id} is not a high end admin, cannot create another admin`);
					throw new BadRequest("internal_error", "Tài khoản của bạn không có quyền tạo admin", "Tài khoản của bạn không có quyền tạo admin");
				}

				const subscription = await SubscriptionService.subscribeBranch(branchId, planId);
				const response = new Success(subscription).toJson;
				return res.status(200).json(response).end();
			} catch (error) {
				throw error;
			}
		}
	)

	public static createOrUpdateBranch = AsyncMiddleware.asyncHandler(
		async (req: Request<any, any, CreateBranchBody>, res: Response) => {
			try {
				const jwtPayload = req.jwtPayload;
				const id = jwtPayload?.id as string;
				const userType = jwtPayload?.type as "MEMBERSHIP" | "USER" | "ADMIN";
				const branch = req.body;

				if (branch.branch_id) {
					const updatedBranch = await prisma.branches.update({
						where: {
							branch_id: branch.branch_id,
						},
						data: {
							...branch,
						}
					});
					const response = new Success(updatedBranch).toJson;
					return res.status(200).json(response).end();
				} else {
					const newBranch = await prisma.branches.create({
						data: {
							...branch,
						}
					});
					const response = new Success(newBranch).toJson;
					return res.status(200).json(response).end();
				}
			} catch (error) {
				throw error;
			}
		}
	)
}