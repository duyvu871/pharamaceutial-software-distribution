import axiosWithAuth from '@lib/axios.ts';
import axios from 'axios';
import { LoginPayloadType } from '@schema/user-schema.ts';
import { APIResponse, ErrorResponse, SuccessResponse } from '@type/api/response.ts';
import { AuthLoginSuccessResponse } from '@type/api/auth.ts';

export const login = async (loginInfo: LoginPayloadType, direct: string): Promise<ErrorResponse & SuccessResponse<AuthLoginSuccessResponse>> => {
	try {
		const { username, password, role } = loginInfo;
		const loginAction = await axios.post('/api/v1/auth/login', {
			username: username,
			password: password,
			role: role
		});

		return loginAction.data;
	} catch (error: any) {
		// console.log('error', error);
		return error?.response?.data;
	}
}

export const register = async (registerInfo: any) => {

}

export const refreshToken = async () => {

}