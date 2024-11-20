import axiosWithAuth from '@lib/axios.ts';
import axios from 'axios';

export const login = async (username: string, password: string) => {
	try {
		const loginAction = await axios.post('/api/v1/login', {
			username: username,
			password: password
		});

		return loginAction.data;
	} catch (error: any) {
		console.log('error', error);
		return {
			message: "Internal Server Error"
		};
	}
}

export const register = async (registerInfo: any) => {

}

export const refreshToken = async () => {

}