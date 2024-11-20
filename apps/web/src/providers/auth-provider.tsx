import React, { createContext, useLayoutEffect, useState } from 'react';
import axios, { InternalAxiosRequestConfig } from 'axios';
import axiosWithAuth, { baseURL, checkCookie } from '@lib/axios';
import { removeCookie, setCookie } from '@util/cookie.ts';
import router from 'next/router';
import { paths } from '@route/path.ts';

type AuthProviderProps = {
	children: React.ReactNode;
}

export type IAuthContext = {
	isAuthenticated: boolean;
	setToken: (newToken: string | null) => void;
	token: string | null;
}

export const AuthContext = createContext<IAuthContext>({
	isAuthenticated: false,
	token: null,
	setToken: () => {}
});

const AuthProvider = ({children}: AuthProviderProps) => {
	const [token, setTokenState] = React.useState<string | null>(
		typeof window !== 'undefined' ? sessionStorage.getItem('token') : null
	);

	const setToken = (newToken: string | null) => {
		setTokenState(newToken);
		if (newToken) {
			sessionStorage.setItem('token', newToken);
		} else {
			sessionStorage.removeItem('token');
		}
	};

	const isAuthenticated = !!token;

	useLayoutEffect(() => {
		// Intercept request and add access token to header if it exists
		// If access token is expired, use refresh token to get a new access token
		axiosWithAuth.interceptors.request.use(
			async (requestConfig) => {
				const { cookieParse, hasCookie } = checkCookie();

				if (hasCookie) {
					const {
						userId,
						accessToken: {
							access_token,
							expire_access_token,
							token_type,
							refresh_token,
							expire_refresh_token,
						},
					} = cookieParse;

					if (new Date() < new Date(expire_access_token)) {
						requestConfig.headers.Authorization = `${token_type} ${access_token}`;
					} else if (new Date() < new Date(expire_refresh_token)) {
						const response = await axios.post(
							`${baseURL}/auth/refresh-token`,
							{
								refreshToken: refresh_token,
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
					}
				} else {
					await router.replace(paths.auth.login);
				}

				return requestConfig;
			},
			(error) => {
				return Promise.reject(error);
			}
		);

		// Intercept response and handle error globally for axios instance with auth
		// If the response status is 401, remove the access token cookie and redirect to login page
		axiosWithAuth.interceptors.response.use(
			(response) => {
				return response;
			},
			(error) => {
				switch (error?.response?.status) {
					case 401:
						removeCookie("accessToken");
						router.replace(paths.auth.login);
						break;

					case 400:
						alert(error.response?.data?.error);
						break;

					default:
						break;
				}

				return Promise.reject(error);
			}
		);
	}, []);

	return (
		<AuthContext.Provider value={{
			isAuthenticated,
			token,
			setToken
		}}>

		</AuthContext.Provider>
	);
};

export default AuthProvider;