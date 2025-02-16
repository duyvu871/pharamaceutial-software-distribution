import AsyncMiddleware from 'utils/asyncHandler.ts';
import {Request, Response} from 'express';
import { PaginationQueryV2 } from 'validations/Pagination.ts';
import {
	transformExpressParamsForPrisma,
	transformExpressParamsForPrismaWithTimeRangeBase,
} from 'server/shared/pagination-parse.ts';
import prisma from 'repository/prisma.ts';
import { RegisterSubscription, SubscriptionTypeParam } from 'validations/Subscription.ts';
import Success from 'responses/successful/Success.ts';
import Forbidden from 'responses/clientErrors/Forbidden.ts';
import { calculateEndDate, calculateEndDateByDay } from 'utils/service/plan.ts';
import { SubscriptionStatus } from 'server/common/enums/model/subscription.ts';
import { BranchIdParam } from 'validations/Branch.ts';

export class SubscriptionController {
	public static getSubscriptionPLan = AsyncMiddleware.asyncHandler(
		async (req: Request<SubscriptionTypeParam, any, any, PaginationQueryV2>, res: Response) => {
			try {
				const subscriptionType = req.params.subscriptionType;
				if (subscriptionType === 'admin') {
					const queryParse = transformExpressParamsForPrismaWithTimeRangeBase("admin_plans", req.query, prisma);
					const query = {
						...queryParse,
						where: {
							...queryParse.where,
							plan_type: {
								not: "admin_system"
							}
						}
					}

					const total = await prisma.admin_plans.count(query);
					const data = await prisma.admin_plans.findMany(query);

					const response = new Success({
						data: data,
						total,
						page: Number(req.query.page),
						totalPage: Math.ceil(total / Number(req.query.limit || 10)),
					}).toJson;

					return res.status(200).json(response).end();
				}
				else if (subscriptionType === 'branch') {
					const queryParse = transformExpressParamsForPrismaWithTimeRangeBase("branch_plans", req.query, prisma);

					const total = await prisma.branch_plans.count(queryParse);
					const data = await prisma.branch_plans.findMany(queryParse);

					const response = new Success({
						data: data,
						total,
						page: Number(req.query.page),
						totalPage: Math.ceil(total / Number(req.query.limit || 10)),
					}).toJson;

					return res.status(200).json(response).end();
				}

			} catch (error) {
				throw error;
			}
		}
	)

	public static registerSubscription = AsyncMiddleware.asyncHandler(
		async (req: Request<SubscriptionTypeParam, any, RegisterSubscription>, res: Response) => {
			try {
				const subscriptionType = req.params.subscriptionType;
				const subscription = req.body;

				if (subscriptionType === 'admin') {
					const isPlanExist = await prisma.admin_plans.findUnique({
						where: {
							id: subscription.planId
						}
					});
					if (!isPlanExist) {
						throw new Forbidden("plan_not_found", "Gói dịch vụ không tồn tại", "Gói dịch vụ không tồn tại");
					}

					const currentDate = new Date();

					console.log('plan', isPlanExist);
					console.log('end_date', calculateEndDateByDay(currentDate, isPlanExist.duration));

					const createAdminSubscription = await prisma.admin_subsciption.create({
						data: {
							admin_id: subscription.registerId,
							plan_id: subscription.planId,
							start_date: currentDate,
							end_date: calculateEndDateByDay(currentDate, isPlanExist.duration),
							status: SubscriptionStatus.ACTIVE,
							payment_method: 'cash',
						},
						include: {
							admin_plans: true
						}
					});

					const response = new Success(createAdminSubscription).toJson;

					return res.status(200).json(response).end();
				}
				else if (subscriptionType === 'branch') {

					const isPlanExist = await prisma.branch_plans.findUnique({
						where: {
							id: subscription.planId
						}
					});

					if (!isPlanExist) {
						throw new Forbidden("plan_not_found", "Gói dịch vụ không tồn tại", "Gói dịch vụ không tồn tại");
					}

					const currentSubscription = await prisma.subscriptions.findFirst({
						where: {
							branch_id: subscription.registerId,
							status: SubscriptionStatus.ACTIVE,
							end_date: {
								gte: new Date()
							}
						}
					});

					if (currentSubscription) {
						const data = await prisma.subscriptions.update({
							where: {
								id: currentSubscription.id
							},
							data: {
								branch_id: subscription.registerId,
								plan_type: 'branch',
								plan_id: subscription.planId,
								start_date: new Date(),
								end_date: calculateEndDateByDay(new Date(), isPlanExist.duration),
								status: SubscriptionStatus.ACTIVE,
							},
							include: {
								branch_plans: true
							}
						});

						const response = new Success(data).toJson;

						return res.status(200).json(response).end();
					} else {
						const data = await prisma.subscriptions.create({
							data: {
								branch_id: subscription.registerId,
								plan_type: 'branch',
								plan_id: subscription.planId,
								start_date: new Date(),
								end_date: calculateEndDateByDay(new Date(), isPlanExist.duration),
								status: SubscriptionStatus.ACTIVE,
							},
							include: {
								branch_plans: true
							}
						});

						const response = new Success(data).toJson;

						return res.status(200).json(response).end();
					}
				}
				else {
					throw new Forbidden("plan_not_found", "Gói dịch vụ không tồn tại", "Gói dịch vụ không tồn tại");
				}

			} catch (error) {
				throw error;
			}
		}
	)

	public static getBranchSubscription = AsyncMiddleware.asyncHandler(
		async (req: Request<BranchIdParam, any, any, PaginationQueryV2>, res: Response) => {
			try {
				const branchId = req.params.branchId;

				const data = await prisma.subscriptions.findMany({
					where: {
						branch_id: branchId,
					},
					include: {
						branch_plans: true
					}
				});

				const response = new Success(data).toJson;

				return res.status(200).json(response).end();
			} catch (error) {
				throw error;
			}
		}
	)

	public static getAdminSubscription = AsyncMiddleware.asyncHandler(
		async (req: Request<BranchIdParam, any, any, PaginationQueryV2>, res: Response) => {
			try {
				const adminId = req.params.branchId;

				const data = await prisma.admin_subsciption.findMany({
					where: {
						admin_id: adminId,
					},
					include: {
						admin_plans: true
					}
				});

				const response = new Success(data).toJson;

				return res.status(200).json(response).end();
			} catch (error) {
				throw error;
			}
		}
	)
}