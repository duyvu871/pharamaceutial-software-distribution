import prisma from "repository/prisma"
import BadRequest from 'responses/clientErrors/BadRequest.ts';

export class SubscriptionService {
	// Tạo mới subscription plan cho chi nhánh
	public static createBranchPlan = async (
		planName: string,
		planType: string,
		price: number,
		durationDays: number
	) => {
		return prisma.branch_plans.create({
			data: {
				plan_name: planName,
				plan_type: planType,
				price,
				duration: durationDays,
			},
		});
	};

// Đăng ký subscription cho chi nhánh
	public static subscribeBranch = async (branchId: string, planId: string) => {
		const plan = await prisma.branch_plans.findUnique({ where: { id: planId } });
		if (!plan) throw new BadRequest("plan_not_found", "Gói dịch vụ không tồn tại", "Gói dịch vụ không tồn tại");

		const startDate = new Date();
		const endDate = new Date(startDate);
		endDate.setDate(startDate.getDate() + plan.duration);

		return prisma.subscriptions.create({
			data: {
				branch_id: branchId,
				plan_id: planId,
				plan_type: plan.plan_type,
				start_date: startDate,
				payment_method: "cash",
				end_date: endDate,
				status: "active",
			},
		});
	};

	// Kiểm tra subscription active
	public static checkBranchSubscription = async (branchId: string) => {
		return prisma.subscriptions.findFirst({
			where: {
				branch_id: branchId,
				status: "active",
				end_date: { gte: new Date() },
			},
			include: { branch_plans: true },
		});
	};

	// Ghi nhận thanh toán
	public static recordPayment = async (
		subscriptionId: string,
		amount: number,
		paymentMethod: string
	) => {
		return prisma.payment_histories.create({
			data: {
				subscription_id: subscriptionId,
				amount,
				payment_method: paymentMethod,
				status: "completed",
			},
		});
	};
}

export class AdminSubscription {
	// Gia hạn subscription admin
	public static renewAdminSubscription = async (subscriptionId: string) => {
		const subscription = await prisma.admin_subsciption.findUnique({
			where: { id: subscriptionId },
			include: { admin_plans: true },
		});

		if (!subscription) throw new Error('Subscription not found');

		const newEndDate = new Date(subscription.end_date);
		newEndDate.setDate(newEndDate.getDate() + subscription.admin_plans.duration);

		return prisma.admin_subsciption.update({
			where: { id: subscriptionId },
			data: {
				end_date: newEndDate,
				status: "active",
			},
		});
	};

	// Tự động hủy subscription hết hạn
	public static cancelExpiredSubscriptions = async () => {
		return prisma.admin_subsciption.updateMany({
			where: {
				end_date: { lt: new Date() },
				status: "active",
			},
			data: { status: "expired" },
		});
	};
}