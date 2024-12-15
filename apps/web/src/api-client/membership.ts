import { ConsumerAttributes } from '@schema/consumer-schema.ts';
import axiosWithAuth from '@lib/axios.ts';
import { SuccessResponse } from '@type/api/response.ts';
import { PayloadMembershipSchema } from '@schema/membership-schema.ts';

export const getMembership = async (id: string): Promise<PayloadMembershipSchema> => {
	try {
		const response = await fetch(`http://localhost:3001/api/v1/consumer/${id}`);
		if (!response.ok) throw new Error('Failed to fetch membership');
		return await response.json();
	} catch (error) {
		throw error;
	}
}

export const getMembershipList = async (
	query:{search: string, orderBy: string, limit: number, page: number},
	branchId: string
): Promise<PayloadMembershipSchema[]> => {
	try {
		const response = await axiosWithAuth.get<
			SuccessResponse<PayloadMembershipSchema[]>
		>(`/membership/${branchId}`, {
			params: query
		});
		return response.data.data;
	} catch (error: any) {
		// throw error;
		console.error(`Error fetching membership: ${error.message}`);
		return [];
	}
}