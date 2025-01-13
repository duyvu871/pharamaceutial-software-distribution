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

export const updateUserProfile = async (userId: string, data: ProfilePayloadType): Promise<ProfilePayloadType> => {
	try {
		const response = await axiosWithAuth.post<SuccessResponse<ProfilePayloadType>>(`/user/profile`, {
			...data,
			id: userId
		});
		return response.data.data
	} catch (error: any) {
		console.error('Error updating user profile:', error);
		throw new Error(error.ressponse.data.errorDescription || 'Cập nhật thông tin người dùng thất bại');
	}
}