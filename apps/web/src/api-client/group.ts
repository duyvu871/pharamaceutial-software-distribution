import { GroupStoreSchema } from '@schema/group-schema.ts';
import axiosWithAuth from '@lib/axios.ts';
import { SuccessResponse } from '@type/api/response.ts';

export const getStoreGroup = async (branchId: string): Promise<GroupStoreSchema[]> => {
	try {
		const response =  await axiosWithAuth.get<SuccessResponse<GroupStoreSchema[]>>(`/store/${branchId}/groups`);
		return response.data.data;
	} catch (error) {
		// throw error;
		console.log(error);
		return [];
	}
}