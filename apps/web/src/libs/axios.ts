import type { AxiosRequestConfig, InternalAxiosRequestConfig } from 'axios';
import axios from 'axios';
import { API_ENDPOINT } from 'config';
import { getCookie, removeCookie, setCookie } from '@util/cookie';
import router from 'next/router';
import { paths } from '@route/path.ts';
import { CookieAccessToken } from '@type/token.ts';

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
		? { hasCookie: true, cookieParse: JSON.parse(cookie) }
		: { hasCookie: false, cookieParse: undefined };
};

const axiosWithAuth = axios.create(axiosRequestConfig);



export default axiosWithAuth;