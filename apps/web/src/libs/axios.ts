import type { AxiosRequestConfig, InternalAxiosRequestConfig } from 'axios';
import axios from 'axios';
import { API_ENDPOINT } from 'config';
import { getCookie, removeCookie, setCookie } from '@util/cookie';
import router from 'next/router';
import { paths } from '@route/path.ts';
import { CookieAccessToken, CookieRefreshToken } from '@type/token.ts';
import { parseJson } from '@util/parse-json.ts';

type CheckCookieResult = {
	hasCookie: true;
	cookieParse: CookieAccessToken;
} | {
	hasCookie: false;
	cookieParse: undefined;
};


export interface APIV1 {
	signin: (signinData: any, callback?: (data: any) => void) => Promise<any>;
	register: (signinData: any, callback?: (data: any) => void) => Promise<any>;
}

export const baseURL = `${API_ENDPOINT}/api/v1`;

const axiosRequestConfig: AxiosRequestConfig = {
	baseURL: baseURL,
	headers: {
		"Content-Type": "application/json",
	},
};

export const checkCookie = (): CheckCookieResult => {
	const cookie = getCookie("accessToken" as string);

	return cookie
		? { hasCookie: true, cookieParse: JSON.parse(cookie)}
		: { hasCookie: false, cookieParse: undefined };
};

const getRefreshToken = () => {
	const refreshToken = getCookie("refreshToken" as string);
	return refreshToken ? parseJson<CookieRefreshToken>(refreshToken) : null;
}

const axiosWithAuth = axios.create(axiosRequestConfig);

const requestInterceptor = axiosWithAuth.interceptors.request.use(
	async (requestConfig) => {

		// if (isRefreshing) return requestConfig; // Prevent multiple refresh requests

		const { cookieParse, hasCookie } = checkCookie();
		const refreshToken = getRefreshToken();
		if (!refreshToken) {
			// router.replace(paths.auth.login);
			window.location.href = paths.auth.login;
			return requestConfig;
		}
		if (!hasCookie) {
			// router.replace(paths.auth.login);
			window.location.href = paths.auth.login;
			return requestConfig; // stop request
		}

		const {
			userId,
			accessToken: {
				access_token,
				expire_access_token,
				token_type,
			},
		} = cookieParse;


		if (new Date() < new Date(expire_access_token)) {
			requestConfig.headers.Authorization = `${token_type} ${access_token}`;
			return requestConfig;

		} else if (new Date() < new Date(refreshToken.refreshToken.expire_refresh_token)) {

			try {
				const response = await axiosWithAuth.post(
					`/api/v1/auth/refresh`,
					{
						refreshToken: refreshToken.refreshToken.refresh_token,
						userId,
					}
				);

				const data = response.data;

				setCookie(
					"accessToken",
					JSON.stringify(data),
					data.accessToken.expires_access_token
				);

				requestConfig.headers.Authorization = `${token_type} ${data.accessToken.access_token}`;


			} catch (error) {
				removeCookie("accessToken");

				window.location.href = paths.auth.login;
				return Promise.reject(error);
			} finally {

			}

			return requestConfig;
		} else {
			removeCookie("accessToken");

			await router.push(paths.auth.login);
			return requestConfig;
		}
	},
	(error) => {
		return Promise.reject(error);
	}
);


const responseInterceptor = axiosWithAuth.interceptors.response.use(
	(response) => {
		return response;
	},
	(error) => {
		// Handle specific status codes first
		switch (error?.response?.status) {
			case 401:
				removeCookie("accessToken");
				const isAdmin = window.location.pathname.includes("admin");
				window.location.href = isAdmin ? paths.admin.login : paths.auth.login;
				break;
			case 400:
				// Handle 400 specifically if needed (even without errorMessage)
				break;
		}

		// Handle error message extraction after status code handling
		if (error.response?.data?.errorMessage) {
			const serverError = new Error(error.response.data.errorMessage);
			return Promise.reject(serverError);
		}

		return Promise.reject(error);
	}
);

export default axiosWithAuth;