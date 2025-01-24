import { branches, branch_plans, payment_histories } from "@prisma/client";

export type Subscription = {
	id: string;
	branch_id: string;
	plan_type: string;
	plan_id: string;
	start_date: string;
	end_date: string;
	status: string;
	auto_renew: boolean;
	payment_method: string;
	createdAt: string;
	updatedAt: string;
	branches: branches;
	branch_plans: branch_plans;
	payment_histories: payment_histories[];
};

export type BranchPlans = {
	id: string;
	plan_name: string;
	plan_type: string;
	price: number;
	duration: number;
	description: string;
	createdAt: string;
	updatedAt: string;

	subscription: Subscription[];
}

export type AdminSubscription = {
	id: string;
	admin_id: string;
	plan_id: string;
	start_date: string;
	end_date: string;
	status: string;
	auto_renew: boolean;
	payment_method?: string;
	trial_ends_at?: string;
	createdAt: string;
	updatedAt: string;

}

export type AdminPlans = {
	id: string;
	plan_name: string;
	plan_type: string;
	price: number;
	duration: number;
	description: string;
	createdAt: string;
	updatedAt: string;

	admin_subscription: AdminSubscription[];
}

export type PlanType = {
	id: string;
	plan_name: string;
	plan_type: string;
	price: number;
	duration: number;
	description: string;
	createdAt: string;
	updatedAt: string;

	[plan: string]: any;
}