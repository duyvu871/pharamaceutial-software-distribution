import axiosWithAuth from '@lib/axios.ts';
import { API_URL } from 'config';
import { ProfilePayloadType, UserSchema } from '@schema/user-schema.ts';
import { Pagination, SuccessResponse } from '@type/api/response.ts';
import { PaginationFilterParams } from '@type/api/params.ts';

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

export const updateUserProfile = async (userId: string, userType: "membership"|"user", data: Partial<ProfilePayloadType>): Promise<ProfilePayloadType> => {
	try {
		const response = await axiosWithAuth.post<SuccessResponse<ProfilePayloadType>>(`/user/profile`, {
			profileUpdate: data,
			id: userId,
			role: userType
		});
		return response.data.data
	} catch (error: any) {
		console.error('Error updating user profile:', error);
		throw new Error(error.ressponse.data.errorDescription || 'Cập nhật thông tin người dùng thất bại');
	}
}

export const resetPassword = async (userId: string, role: string, pwd: {password: string, confirmedPassword: string }): Promise<{message: string}> => {
	try {
		const response = await axiosWithAuth.post<SuccessResponse<{message: string}>>(`/user/reset-password`, {
			id: userId,
			role: role,
			password: pwd.password,
			confirmPassword: pwd.confirmedPassword
		});
		return response.data.data;
	} catch (error: any) {
		console.error('Error resetting password:', error);
		throw new Error(error.ressponse.data.errorDescription || 'Cập nhật mật khẩu thất bại');
	}
}
