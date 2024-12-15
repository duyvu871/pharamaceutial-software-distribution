import { ConsumerAttributes } from '@schema/consumer-schema.ts';
import axiosWithAuth from '@lib/axios.ts';
import { SuccessResponse } from '@type/api/response.ts';

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
	query:{search: string, orderBy: string, limit: number, page: number},
	branchId: string
): Promise<ConsumerAttributes[]> => {
	try {
		const response = await axiosWithAuth.get<SuccessResponse<ConsumerAttributes[]>>(`/consumer/${branchId}`, {
			params: query
		});
		return response.data.data;
	} catch (error: any) {
		// throw error;
		console.error(`Error fetching consumers: ${error.message}`);
		return [];
	}
}