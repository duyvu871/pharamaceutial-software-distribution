import { PaginationFilterParams } from '@type/api/params.ts';
import axiosWithAuth from '@lib/axios.ts';
import { Pagination, SuccessResponse } from '@type/api/response.ts';
import { AdminPlans, BranchPlans, Subscription } from '@schema/subscription-schema.ts';

type FlexibleSubscription<type> = type extends "admin" ? AdminPlans : type extends "branch" ? BranchPlans : never;

export const getSubscriptionPlan = async <T extends "admin"| "branch">(
		type: T,
		filter: PaginationFilterParams
) => {
		try {
				const response = await axiosWithAuth.get<SuccessResponse<Pagination<FlexibleSubscription<T>>>>(`/subscription/plan/${type}`, {
						params: {
								page: filter.page,
								pageSize: filter.limit,
								search: filter.search,
								searchFields: filter.searchFields,
								orderBy: filter.orderBy,
								filterBy: filter.filterBy,
						},
				});

				return response.data.data;
		} catch (error) {
				throw error;
		}
}

export const registerSubscription = async <T extends "admin"| "branch">(
	type: T,
	planId: string,
	registerId: string
) => {
	try {
		const response = await axiosWithAuth.post<SuccessResponse<Subscription>>(`/subscription/register/${type}`, {
			planId,
			registerId
		});
		return response.data.data;
	} catch (error) {
		throw error;
	}
}

export const getBranchSubscription = async (branchId: string) => {
	try {
		const response = await axiosWithAuth.get<SuccessResponse<Subscription[]>>(`/subscription/branch/${branchId}`);
		return response.data.data;
	} catch (error) {
		throw error;
	}
}