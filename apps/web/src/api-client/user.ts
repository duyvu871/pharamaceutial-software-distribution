import axiosWithAuth from '@lib/axios.ts';
import { API_URL } from 'config';
import { ProfilePayloadType } from '@schema/user-schema.ts';
import { SuccessResponse } from '@type/api/response.ts';

export const getUserProfile = async (userId: any): Promise<ProfilePayloadType | null> => {
	try {
		const response = await axiosWithAuth<SuccessResponse<ProfilePayloadType>>(`/user/profile`, {
			params: {
				id: userId
			}
		});
		if (response.data.status !== 200) {
			return null
		}
		return response.data.data;
	} catch (error) {
		console.error('Error getting user profile:', error);
		return null;
	}
}