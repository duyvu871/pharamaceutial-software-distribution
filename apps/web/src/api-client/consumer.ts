import { ConsumerAttributes, ConsumerCreationAttributes } from '@schema/consumer-schema.ts';
import axiosWithAuth from '@lib/axios.ts';
import { Pagination, SuccessResponse } from '@type/api/response.ts';
import { RewardPointResponse } from '@schema/reward-point-schema.ts';
import { DoctorSchema } from '@schema/doctor-schema.ts';

export const getConsumer = async (id: string): Promise<ConsumerAttributes> => {
		try {
				const response = await fetch(`http://localhost:3001/api/v1/consumer/${id}`);
				if (!response.ok) throw new Error('Failed to fetch consumer');
				return await response.json();
		} catch (error) {
				throw error;
		}
}

export const getConsumerList = async (
	query:{	branchId: string, search: string, orderBy?: string, limit?: number, page?: number},
): Promise<ConsumerAttributes[]> => {
	if (!query.branchId) {
		return [];
	}
	try {
		const response = await axiosWithAuth.get<SuccessResponse<ConsumerAttributes[]>>(`/consumer/${query.branchId}`, {
			params: {
				search: query.search,
				limit: query.limit || 10,
				page: query.page || 1,
				orderBy: query.orderBy || 'created_at:ASC',
			}
		});
		return response.data.data;
	} catch (error: any) {
		// throw error;
		console.error(`Error fetching consumers: ${error.message}`);
		return [];
	}
}

export const getConsumerListV2 = async (filter: {
	branchId: string;
	page: number;
	limit: number;
	search?: string; // search by fts
	searchFields?: string; // name:abc, name:def
	orderBy?: string; // created_at:desc, created_at:asc
	filterBy?: string; // status:1, status:0
}) => {
	try {
		if (!filter.branchId) {
			throw new Error('Branch ID is required');
		}
		const response = await axiosWithAuth.get<SuccessResponse<Pagination<ConsumerAttributes>>>(`/consumer/${filter.branchId}/get-consumer`, {
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

export const createConsumer = async (branchId: string, data: ConsumerCreationAttributes): Promise<ConsumerAttributes> => {
	try {
		const response = await axiosWithAuth.post<SuccessResponse<ConsumerAttributes>>(`/consumer/${branchId}`, data);
		return response.data.data;
	} catch (error: any) {
		// throw error;
		console.error(`Error creating consumer: ${error.message}`);
		throw new Error('Failed to create consumer');
	}
}

export const getConsumerRewardPoint = async (branchId: string, id: string): Promise<RewardPointResponse | null> => {
	try {
		const response = await axiosWithAuth.get<SuccessResponse<RewardPointResponse>>(`/consumer/${branchId}/reward-point/${id}`);
		return response.data.data;
	} catch (error: any) {
		// throw error;
		console.error(`Error fetching consumer reward point: ${error.message}`);
		return null
	}
}