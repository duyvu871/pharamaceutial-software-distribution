
import axiosWithAuth from '@lib/axios.ts';
import { PaginationFilterParams } from '@type/api/params.ts';
import { Pagination, SuccessResponse } from '@type/api/response.ts';
import { AdminType, AminBranchFormFieldCreation } from '@schema/admin/admin-schema.ts';
import { UserSchema } from '@schema/user-schema.ts';
import { AdminGettingBranches, BranchType } from '@schema/branch-schema.ts';
import { Subscription } from '@schema/subscription-schema.ts';

// Get admin data
export const getAdminData = async (filter: PaginationFilterParams, isMock?: boolean) => {
	try {
		const response = await axiosWithAuth.get<SuccessResponse<Pagination<AdminType>>>(`/admin`);

		return response.data.data;
	} catch (error) {
		throw error;
	}
};

// Create admin data
export const createAdminData = async (admin: Partial<AdminType>) => {
	try {
		const response = await axiosWithAuth.post<SuccessResponse<AdminType>>(`/admin`, admin);

		return response.data.data;
	} catch (error) {
		throw error;
	}
}

// Get admin data by id
export const getAdminDataById = async (adminId: string) => {
	try {
		const response = await axiosWithAuth.get<SuccessResponse<AdminType>>(`/admin/${adminId}`);

		return response.data.data;
	} catch (error) {
		throw error;
	}
}

// Update admin data
export const updateAdminData = async (adminId: string, admin: Partial<AdminType>) => {
	try {
		const response = await axiosWithAuth.post<SuccessResponse<AdminType>>(`/admin/${adminId}`, admin);

		return response.data.data;
	} catch (error) {
		throw error;
	}
}

// Check high end admin
export const checkHighEndAdmin = async () => {
	try {
		const response = await axiosWithAuth.get<SuccessResponse<boolean>>(`/admin/check-high-end`);

		return response.data.data;
	} catch (error) {
		throw error;
	}
}

// Delete admin data
export const deleteAdminData = async (adminId: string) => {
	try {
		const response = await axiosWithAuth.delete<SuccessResponse<AdminType>>(`/admin/${adminId}`);

		return response.data.data;
	} catch (error) {
		throw error;
	}
}

// Get admin subscription
export const setAdminSubscription = async (adminId: string, subscription: string) => {
	try {
		const response = await axiosWithAuth.post<SuccessResponse<boolean>>(`/admin/subscription`, {
			params: {
				id: adminId,
				sub: subscription,
				type: "admin",
			}
		});

		return response.data.data;
	} catch (error) {
		throw error;
	}
}

// Get user subscription
export const setUserSubscription = async (userId: string,  subscription: string) => {
	try {
		const response = await axiosWithAuth.post<SuccessResponse<boolean>>(`/admin/subscription`, {
			params: {
				id: userId,
				sub: subscription,
				type: "user",
			}
		});

		return response.data.data;
	} catch (error) {
		throw error;
	}
}

// Get user slave list
export const getUserSlaveList = async (filter: PaginationFilterParams) => {
	try {
		const response = await axiosWithAuth.get<SuccessResponse<Pagination<UserSchema>>>(`/admin/user-slave`, {
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
		console.error('Error getting user list:', error);
		throw error;
	}
}

// Delete user slave
export const deleteUserSlave = async (userId: string) => {
	try {
		const response = await axiosWithAuth.delete<SuccessResponse<UserSchema>>(`/admin/user-slave/${userId}`);
		return response.data.data;
	} catch (error) {
		console.error('Error deleting user:', error);
		throw error;
	}
}

// Create or update user slave
export const createOrUpdateUserSlave = async (user: Partial<UserSchema>) => {
	try {
		const response = await axiosWithAuth.post<SuccessResponse<UserSchema>>(`/admin/user-slave`, user);
		return response.data.data;
	} catch (error) {
		console.error('Error creating user:', error);
		throw error;
	}
}

// Get branch list
export const getBranches = async (
	filter: PaginationFilterParams
		& {
		paymentStatus?: string;
	}
) => {
	try {
		const response = await axiosWithAuth.get<SuccessResponse<Pagination<AdminGettingBranches>>>(`/admin/branches`, {
			params: {
				page: filter.page,
				pageSize: filter.limit,
				search: filter.search,
				searchFields: filter.searchFields,
				orderBy: filter.orderBy,
				filterBy: filter.filterBy,
				paymentStatus: filter.paymentStatus,
			},
		});
		return response.data.data;
	} catch (error) {
		console.error('Error getting branches:', error);
		throw error;
	}
}

export const getBranchPaymentStat = async () => {
	try {
		const response = await axiosWithAuth.get<SuccessResponse<Record<string, number>>>(`/admin/payment-stat`);
		return response.data.data;
	} catch (error) {
		console.error('Error getting branch payment stat:', error);
		throw error;
	}
}

// Delete branch
export const deleteBranch = async (branchId: string) => {
	try {
		const response = await axiosWithAuth.delete<SuccessResponse<AdminGettingBranches>>(`/admin/branches/${branchId}`);
		return response.data.data;
	} catch (error) {
		console.error('Error deleting branch:', error);
		throw error;
	}
}

// Create or update branch
export const createOrUpdateBranch = async (branch: Partial<AminBranchFormFieldCreation>) => {
	try {
		const response = await axiosWithAuth.post<SuccessResponse<AdminGettingBranches>>(`/admin/branches`, branch);
		return response.data.data;
	} catch (error) {
		console.error('Error creating branch:', error);
		throw error;
	}
}

export const updatePaymentSubscriptionStatus = async (type: "branch" | "admin", id: string, status: string) => {
	try {
		const response = await axiosWithAuth.post<SuccessResponse<Subscription>>(`/admin/payment-subscription`, {
			type,
			id,
			status,
		});
		return response.data.data;
	} catch (error) {
		console.error('Error updating payment subscription status:', error);
		throw error;
	}
}