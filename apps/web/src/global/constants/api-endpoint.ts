import { API_ENDPOINT, PREFIX, PREFIX_VERSION } from 'config';

export const resolveApiEndpoint = (path: string): string => {
	return `${API_ENDPOINT}/${PREFIX}/${PREFIX_VERSION}/${path}`;
}

export const apiEndpoint = {
	auth: {
		sign_in: resolveApiEndpoint('auth/sign-in'),
		register: resolveApiEndpoint('auth/register'),
		forgot_password: resolveApiEndpoint('auth/forgot-password'),
		reset_password: resolveApiEndpoint('auth/reset-password'),
	},
	profile: {
		me: resolveApiEndpoint('profile/me'),
		update: resolveApiEndpoint('profile/update'),
		change_password: resolveApiEndpoint('profile/change-password'),
	},
	medical: {
		records: resolveApiEndpoint('medical/records'),
		update: resolveApiEndpoint('medical/update'),
	}
}