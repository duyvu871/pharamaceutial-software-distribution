import { Prisma, users } from '@prisma/client';
import prisma from 'repository/prisma.ts';
import BadRequest from 'responses/clientErrors/BadRequest.ts';
import AuthService from 'services/AuthService.ts';
import { omitProperties } from 'utils/object.ts';
import { calculateEndDate } from 'utils/service/plan.ts';
import { AdminPlanType, SubscriptionStatus } from 'server/common/enums/model/subscription.ts';

export class AdminTask {
		public static async login(username: string, password: string) {
				try {
					const admin = await prisma.admins.findUnique({
						where: { username: username, },
					});
					if (!admin) throw new BadRequest('admin_not_found', 'Admin không tồn tại trên hệ thống', 'Admin không tồn tại');

					const comparedPassword = await AuthService.comparePassword(password, admin.password);
					if (!comparedPassword) throw new BadRequest("password_wrong", "Mật khẩu không đúng, vui lòng thử lại", "Mật khẩu không đúng");

					return omitProperties(admin, ["password"]);
				} catch (error: any) {
					throw error;
				}
		}

		public static async getUsersSlave(adminId: string) {
			try {
				const users = await prisma.admin_to_user.findMany({
					where: { adminId },
					include: {
						users: true,
					}
				});

				return users;
			} catch (error: any) {
				throw error;
			}
		}

		public static async createUserSlave(adminId: string, user: Omit<users, "id">) {
			try {
				const passwordHashed =  await AuthService.hashPassword(user.password);
				const newUser = await prisma.users.create({
					data: {
						...user,
						password: passwordHashed,
					},
				});
				const adminToUser = await prisma.admin_to_user.create({
					data: {
						adminId,
						userId: newUser.id,
					}
				});
				return newUser;
			} catch (error: any) {
				throw error;
			}
		}

		public static async createAdminSlave(admin: Omit<Prisma.adminsCreateInput, "id">) {
			try {
				const passwordHashed = await AuthService.hashPassword(admin.password);
				const newAdmin = await prisma.admins.create({
					data: {
						...admin,
						password: passwordHashed,
					},
				});
				return newAdmin;
			} catch (error: any) {
				throw error;
			}
		}

		public static async updateUserSlave(adminId: string, userId: string, user: Prisma.usersUpdateInput) {
			try {
				const adminToUser = await prisma.admin_to_user.findFirst({
					where: { adminId, userId },
				});

				if (!adminToUser) throw new BadRequest("user_not_found", "Người dùng không tồn tại", "Người dùng không tồn tại");

				const updatedUser = await prisma.users.update({
					where: { id: userId },
					data: user,
				});
				return updatedUser;
			} catch (error: any) {
				throw error;
			}
		}

		public static async deleteUserSlave(adminId: string, userId: string) {
			try {
				const adminToUser = await prisma.admin_to_user.findFirst({
					where: { adminId, userId },
				});

				if (!adminToUser) throw new BadRequest("user_not_found", "Người dùng không tồn tại", "Người dùng không tồn tại");

				await prisma.admin_to_user.delete({
					where: { id: adminToUser.id },
				});
				await prisma.users.delete({
					where: { id: userId },
				});
				return true;
			} catch (error: any) {
				throw error;
			}
		}

		public static async getPlans() {
			try {
				const plans = await prisma.branch_plans.findMany();
				return plans;
			} catch (error: any) {
				throw error;
			}
		}

		public static async createPlan(plan: Omit<Prisma.branch_plansCreateInput, "id">) {
			try {
				const newPlan = await prisma.branch_plans.create({
					data: plan,
				});
				return newPlan;
			} catch (error: any) {
				throw error;
			}
		}

		public static async updatePlan(planId: string, plan: Prisma.branch_plansUpdateInput) {
			try {
				const updatedPlan = await prisma.branch_plans.update({
					where: { id: planId },
					data: plan,
				});
				return updatedPlan;
			} catch (error: any) {
				throw error;
			}
		}

		public static async deletePlan(planId: string) {
			try {
				await prisma.branch_plans.delete({
					where: { id: planId },
				});
				return true;
			} catch (error: any) {
				throw error;
			}
		}

		public static async getBranches() {
			try {
				const branches = await prisma.branches.findMany();
				return branches;
			} catch (error: any) {
				throw error;
			}
		}

		public static async setPLanToBranch(branchId: string, planId: string) {
			try {
				const plan = await prisma.branch_plans.findUnique({
					where: { id: planId },
				});
				if (!plan) throw new BadRequest("plan_not_found", "Gói dịch vụ không tồn tại", "Gói dịch vụ không tồn tại");
				return await prisma.subscriptions.create({
					data: {
						branch_id: branchId,
						plan_id: planId,
						plan_type: plan.plan_type,
						end_date: calculateEndDate(new Date(), plan.duration),
						status: SubscriptionStatus.ACTIVE,
					}
				});
			} catch (error: any) {
				throw error;
			}
		}

		public static async isAdminHighEnd(adminId: string) {
			try {
				const admin = await prisma.admins.findUnique({
					where: { id: adminId },
					include: {
						admin_subsciption: {
							include: {
								admin_plans: true,
							}
						}
					}
				});

				if (!admin) throw new BadRequest("admin_not_found", "Admin không tồn tại", "Admin không tồn tại");

				return admin.admin_subsciption.some(sub => sub?.admin_plans?.plan_type === AdminPlanType.AdminSystem);
			} catch (error: any) {
				throw error;
			}
		}
}