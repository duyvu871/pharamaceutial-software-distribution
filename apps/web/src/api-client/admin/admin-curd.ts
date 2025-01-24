
import axiosWithAuth from '@lib/axios.ts';
import { PaginationFilterParams } from '@type/api/params.ts';
import { Pagination, SuccessResponse } from '@type/api/response.ts';
import { AdminType } from '@schema/admin/admin-schema.ts';
import { UserSchema } from '@schema/user-schema.ts';
import { AdminGettingBranches, BranchType } from '@schema/branch-schema.ts';

export const getAdminData = async (filter: PaginationFilterParams, isMock?: boolean) => {
	try {
		const response = await axiosWithAuth.get<SuccessResponse<Pagination<AdminType>>>(`/admin`);

		return response.data.data;
	} catch (error) {
		throw error;
	}
};

export const createAdminData = async (admin: Partial<AdminType>) => {
	try {
		const response = await axiosWithAuth.post<SuccessResponse<AdminType>>(`/admin`, admin);

		return response.data.data;
	} catch (error) {
		throw error;
	}
}

export const getAdminDataById = async (adminId: string) => {
	try {
		const response = await axiosWithAuth.get<SuccessResponse<AdminType>>(`/admin/${adminId}`);

		return response.data.data;
	} catch (error) {
		throw error;
	}
}

export const updateAdminData = async (adminId: string, admin: Partial<AdminType>) => {
	try {
		const response = await axiosWithAuth.post<SuccessResponse<AdminType>>(`/admin/${adminId}`, admin);

		return response.data.data;
	} catch (error) {
		throw error;
	}
}

export const checkHighEndAdmin = async () => {
	try {
		const response = await axiosWithAuth.get<SuccessResponse<boolean>>(`/admin/check-high-end`);

		return response.data.data;
	} catch (error) {
		throw error;
	}
}

export const deleteAdminData = async (adminId: string) => {
	try {
		const response = await axiosWithAuth.delete<SuccessResponse<boolean>>(`/admin/${adminId}`);

		return response.data.data;
	} catch (error) {
		throw error;
	}
}

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

export const createOrUpdateUserSlave = async (user: Partial<UserSchema>) => {
	try {
		const response = await axiosWithAuth.post<SuccessResponse<UserSchema>>(`/admin/user-slave`, user);
		return response.data.data;
	} catch (error) {
		console.error('Error creating user:', error);
		throw error;
	}
}

export const getBranches = async (filter: PaginationFilterParams) => {
	try {
		const response = await axiosWithAuth.get<SuccessResponse<Pagination<AdminGettingBranches>>>(`/admin/branches`, {
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
		console.error('Error getting branches:', error);
		throw error;
	}
}

export const createOrUpdateBranch = async (branch: Partial<AdminGettingBranches>) => {
	try {
		const response = await axiosWithAuth.post<SuccessResponse<AdminGettingBranches>>(`/admin/branches`, branch);
		return response.data.data;
	} catch (error) {
		console.error('Error creating branch:', error);
		throw error;
	}
}