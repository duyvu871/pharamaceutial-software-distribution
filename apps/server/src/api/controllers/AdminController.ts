import AsyncMiddleware from "server/utils/asyncHandler";
import { Request, Response } from "express";
import { AdminTask } from 'repository/admin/task.ts';
import BadRequest from 'responses/clientErrors/BadRequest.ts';
import { PaginationQueryV2 } from 'validations/Pagination.ts';
import { transformExpressParamsForPrismaWithTimeRangeBase } from 'server/shared/pagination-parse.ts';
import prisma from 'repository/prisma.ts';
import Success from "server/responses/successful/Success";
import { AdminCreation, AdminIdParam, UpdatePaymentSubscriptionBody, UserCreation } from 'validations/Admin.ts';
import AuthService from 'services/AuthService.ts';
import { SubscriptionService } from 'services/SubcriptionService.ts';
import { BranchIdParam, CreateBranchBody } from 'validations/Branch.ts';
import { UserIdParam } from 'validations/User.ts';
import { BranchService } from 'services/BranchService.ts';
import { Prisma, branch_integration, branch_details } from "@repo/orm";
import { SubscriptionPaymentStatus } from 'validations/Subscription.ts';
import { StoreService } from 'services/StoreService.ts';

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
					include: {
						admin_subsciption: {
							include: {
								admin_plans: true,
							}
						}
					}
				});
				const response = new Success(newAdmin).toJson;
				res.status(200).json(response).end();
			} catch (error) {
				if (error instanceof Prisma.PrismaClientKnownRequestError) {
					if (error.code === "P2002") {
						throw new BadRequest("username_exist", "Tên tài khoản đã tồn tại", "Tên tài khoản đã tồn tại");
					}
				}
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

				// if (!isHighEndAdmin) {
				// 	console.log(`User id ${id} is not a high end admin, cannot create another admin`);
				// 	throw new BadRequest("internal_error", "Tài khoản của bạn không có quyền tạo admin", "Tài khoản của bạn không có quyền tạo admin");
				// }
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
				ConditionalRequired<UserCreation, "id", "password" | "username">,
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
						},
						omit: {
							password: true,
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
						omit: {
							password: true,
						}
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

	public static deleteUserSlave = AsyncMiddleware.asyncHandler(
		async (req: Request<UserIdParam, any, any>, res: Response) => {
			try {
				const jwtPayload = req.jwtPayload;
				const id = jwtPayload?.id as string;
				const userType = jwtPayload?.type as "MEMBERSHIP" | "USER" | "ADMIN";
				const userId = req.params.userId;

				if (userType !== "ADMIN") {
					console.log(`User type ${userType} id ${id} is not an admin, cannot create another admin`);
					throw new BadRequest("internal_error", "Internal server error", "Internal server error");
				}

				const adminToUser = await prisma.admin_to_user.findFirst({
					where: {
						adminId: id,
						userId,
					}
				});

				if (!adminToUser) {
					throw new BadRequest("user_not_found", "Người dùng không tồn tại", "Người dùng không tồn tại");
				}

				const deletedUser = await prisma.users.delete({
					where: {
						id: userId,
					},
					omit: {
						password: true,
					}
				});

				const response = new Success(deletedUser).toJson;

				return res.status(200).json(response).end();
			} catch (error) {
				throw error;
			}
		}
	)

	public static getBranches = AsyncMiddleware.asyncHandler(
		async (req: Request<any, any, any, PaginationQueryV2 & SubscriptionPaymentStatus>, res: Response) => {
			try {
				const jwtPayload = req.jwtPayload;
				const id = jwtPayload?.id as string;
				const userType = jwtPayload?.type as "MEMBERSHIP" | "USER" | "ADMIN";
				const paymentStatus = req.query.paymentStatus;
				const parsedQuery = transformExpressParamsForPrismaWithTimeRangeBase("branches", req.query, prisma);

				if (userType !== "ADMIN") {
					console.log(`User type ${userType} id ${id} is not an admin, cannot create another admin`);
					throw new BadRequest("internal_error", "Internal server error", "Internal server error");
				}


				const paymentStatusQuery: Prisma.branchesFindManyArgs = {
					where: {}
				};

				if (paymentStatus === "total" || !paymentStatus) {
					paymentStatusQuery.where = {}
				} else if (paymentStatus === "unregistered") {
					paymentStatusQuery.where = {
						subscriptions: {
							none: {},
						}
					}
				} else {
					paymentStatusQuery.where = {
						subscriptions: {
							some: {
								payment_status: paymentStatus,
							}
						}
					}
				}

				console.log("paymentStatusQuery", paymentStatusQuery);

				const isHighEndAdmin = await AdminTask.isAdminHighEnd(id);
				if (isHighEndAdmin) {
					const count = await prisma.branches.count({
						...parsedQuery,
						where: {
							...parsedQuery.where,
							...paymentStatusQuery.where,
						}
					});
					const branches = await prisma.branches.findMany({
						...parsedQuery,
						where: {
							...parsedQuery.where,
							...paymentStatusQuery.where,
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
							},
							branch_details: true,
							branch_integration: true,
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
						...paymentStatusQuery.where,
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
						},
						branch_details: true,
						branch_integration: true,
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

	public static createOrUpdateBranch = AsyncMiddleware.asyncHandler(
		async (req: Request<any, any, CreateBranchBody>, res: Response) => {
			try {
				const jwtPayload = req.jwtPayload;
				const id = jwtPayload?.id as string;
				const userType = jwtPayload?.type as "MEMBERSHIP" | "USER" | "ADMIN";
				const { branch_details, branch_integration, ...branch } = req.body;

				let branchCreated;
				let upsertBranchDetails: branch_details | null = null;
				let upsertBranchIntegration: branch_integration | null = null;

				if (branch.branch_id) {
					branchCreated = await prisma.branches.update({
						where: {
							branch_id: branch.branch_id,
						},
						data: {
							...branch,
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
							},
							branch_details: true,
							branch_integration: true,
						}
					});
				}
				else {
					const { user_id, ...creationBranch } = branch;
					if (!branch.user_id) throw new BadRequest("user_id_required", "Để tạo chi nhánh cần có đại lí", "Để tạo chi nhánh cần có đại lí");
					branchCreated = await prisma.branches.create({
						data: {
							...creationBranch,
							owner_id: branch.user_id,
							stores: {
								create: {
									store_name: branch.branch_name || '',
									address: branch.address || '',
									created_at: new Date(),
									updated_at: new Date(),
									store_reward_point: {
										create: {
											convert_to: 'VND',
											convert_rate: 100000,
											point_value: 5000,
											status: 1
										}
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
					});

				}

				if (branch_integration) {
					upsertBranchIntegration = await BranchService.upsertBranchIntegration(branchCreated.branch_id, branch_integration);
				}

				if (branch_details) {
					upsertBranchDetails = await BranchService.upsertBranchDetail(branchCreated.branch_id, branch_details);
				}

				const response = new Success({
					...branchCreated,
					branch_integration: [upsertBranchIntegration],
					branch_details: [upsertBranchDetails],
				}).toJson;
				return res.status(200).json(response).end();
			} catch (error) {
				throw error;
			}
		}
	)

	public static getBranchPaymentStat = AsyncMiddleware.asyncHandler(
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

				const countQuery: Record<string, Prisma.branchesFindManyArgs> = {
					total: {
						where: {}
					},
					unregistered: {
						where: {
							subscriptions: {
								none: {}
							}
						}
					},
					...(['paid', 'unpaid', 'pending', 'cancelled', 'expired'].reduce((acc, status) => {
						acc[status] = {
							where: {
								subscriptions: {
									some: {
										payment_status: status,
									}
								}
							}
						}
						return acc;
					}, {}))
				}

				const adminQuery: Prisma.branchesFindManyArgs = {
					where: {}
				}

				if (isHighEndAdmin) {
					adminQuery.where = {}
				} else {
					adminQuery.where = {
						users: {
							admin_to_user: {
								some: {
									adminId: id,
								}
							}
						}
					}
				}

				const stats = await Promise.all(Object.keys(countQuery).map(async (key) => {
					const count = await prisma.branches.count({
						where: {
							...adminQuery.where,
							...countQuery[key].where,
						}
					});
					return {
						[key]: count
					}
				}, {}));

				const statsObject = stats.reduce((acc, stat) => ({ ...acc, ...stat, }), {});

				const response = new Success(statsObject).toJson;

				return res.status(200).json(response).end();
			} catch (error) {
				throw error;
			}
		}
	)

	public static deleteBranch = AsyncMiddleware.asyncHandler(
		async (req: Request<BranchIdParam, any, any>, res: Response) => {
			try {
				const jwtPayload = req.jwtPayload;
				const id = jwtPayload?.id as string;
				const userType = jwtPayload?.type as "MEMBERSHIP" | "USER" | "ADMIN";
				const branchId = req.params.branchId;

				if (userType !== "ADMIN") {
					console.log(`User type ${userType} id ${id} is not an admin, cannot create another admin`);
					throw new BadRequest("internal_error", "Internal server error", "Internal server error");
				}

				const branch = await prisma.branches.findUnique({
					where: {
						branch_id: branchId,
					}
				});

				if (!branch) {
					throw new BadRequest("branch_not_found", "Chi nhánh không tồn tại", "Chi nhánh không tồn tại");
				}

				const deletedBranch = await prisma.branches.delete({
					where: {
						branch_id: branchId,
					}
				});

				const response = new Success(deletedBranch).toJson;
				return res.status(200).json(response).end();
			} catch (error) {
				throw error;
			}
		}
	)

	public static deleteAdmin = AsyncMiddleware.asyncHandler(
		async (req: Request<AdminIdParam, any, any>, res: Response) => {
			try {
				const jwtPayload = req.jwtPayload;
				const id = jwtPayload?.id as string;
				const userType = jwtPayload?.type as "MEMBERSHIP" | "USER" | "ADMIN";
				const adminId = req.params.adminId;

				if (userType !== "ADMIN") {
					console.log(`User type ${userType} id ${id} is not an admin, cannot create another admin`);
					throw new BadRequest("internal_error", "Internal server error", "Internal server error");
				}

				const isHighEndAdmin = await AdminTask.isAdminHighEnd(id);

				if (!isHighEndAdmin) {
					console.log(`User id ${id} is not a high end admin, cannot create another admin`);
					throw new BadRequest("internal_error", "Tài khoản của bạn không có quyền tạo admin", "Tài khoản của bạn không có quyền tạo admin");
				}

				const isDeletedAdminHighEnd = await AdminTask.isAdminHighEnd(adminId);

				if (isDeletedAdminHighEnd) {
					console.log(`User id ${adminId} is a high end admin, cannot delete`);
					throw new BadRequest("internal_error", "Tài khoản của bạn không có quyền xóa", "Tài khoản của bạn không có quyền xóa");
				}

				const deletedAdmin = await prisma.admins.delete({
					where: {
						id: adminId,
					}
				});

				const response = new Success(deletedAdmin).toJson;
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

	public static createAdminPlan = AsyncMiddleware.asyncHandler(
		async (req: Request<any, any, {
			plan_name: string;
			plan_type: string;
			price: number;
			duration: number;
			description?: string;
		}>, res: Response) => {
			const jwtPayload = req.jwtPayload;
			const adminId = jwtPayload?.id as string;

			if (!(await AdminTask.isAdminHighEnd(adminId))) {
				throw new BadRequest("permission_denied", "Không có quyền tạo plan", "Permission denied");
			}

			const newPlan = await prisma.admin_plans.create({
				data: {
					...req.body,
				}
			});

			return res.status(200).json(new Success(newPlan).toJson).end();
		}
	);

	public static updatePaymentSubscription = AsyncMiddleware.asyncHandler(
		async (req: Request<any, any, UpdatePaymentSubscriptionBody>, res: Response) => {
			try {
				const jwtPayload = req.jwtPayload;
				const adminId = jwtPayload?.id as string;
				const type = req.body.type;
				const id = req.body.id;
				const status = req.body.status;

				if (type === "admin") {
					const isHighEndAdmin = await AdminTask.isAdminHighEnd(adminId);
					if (!isHighEndAdmin) {
						console.log(`User id ${adminId} is not a high end admin, cannot create another admin`);
						throw new BadRequest("internal_error", "Tài khoản của bạn không có quyền thực hiện hành động này", "Tài khoản của bạn không có quyền thực hiện hành động này");
					}

					const updateSubscription = await prisma.subscriptions.update({
						where: { id, },
						data: { payment_status: status, }
					})

					const response = new Success(updateSubscription).toJson;
					return res.status(200).json(response).end();
				} else if (type === "branch") {
					const updateSubscription = await prisma.subscriptions.update({
						where: { id, },
						data: { payment_status: status, }
					})

					const response = new Success(updateSubscription).toJson;
					return res.status(200).json(response).end();
				}

			} catch (error) {
				throw error;
			}
		}
	)
}