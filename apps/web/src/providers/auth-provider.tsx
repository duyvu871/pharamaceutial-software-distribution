"use client";

import React, { createContext, useEffect, useLayoutEffect, useState } from 'react';
import axios, { InternalAxiosRequestConfig } from 'axios';
import axiosWithAuth, { baseURL, checkCookie } from '@lib/axios';
import { removeCookie, setCookie } from '@util/cookie.ts';
import {useRouter} from 'next/navigation';
import { paths } from '@route/path.ts';
import { AuthSessionInfo, authSessionInfoSchema, LoginFormType, LoginPayloadType } from '@schema/user-schema.ts';
import useToast from '@hook/client/use-toast-notification.ts';
import { login } from '@api/auth.ts';
import { CookieAccessToken, CookieRefreshToken } from '@type/token.ts';
import { getLocalStorage, removeLocalStorage, setLocalStorage } from '@util/localstorage.ts';

type AuthProviderProps = {
	children: React.ReactNode;
	refreshToken?: CookieRefreshToken | null;
}

export type IAuthContext = {
	isAuthenticated: boolean;
	userSessionInfo: AuthSessionInfo | null;
	token: string | null;
	setToken: (newToken: string | null) => void;
	loginAction: (userPayload: LoginFormType, redirect: string) => Promise<void>;
	logout: () => void;
}

export const AuthContext = createContext<IAuthContext>({
	isAuthenticated: false,
	token: null,
	userSessionInfo: null,
	setToken: () => {},
	loginAction: () => Promise.resolve(),
	logout: () => {},
});

const AuthProvider = ({children, refreshToken}: AuthProviderProps) => {
	const toast = useToast();
	const router = useRouter();
	const [token, setTokenState] = useState<string | null>(
		typeof window !== 'undefined'
			? getLocalStorage<CookieAccessToken>('accessToken')?.accessToken?.access_token || null
			: null
	);

	const [authProfile, setAuthProfile] = useState<AuthSessionInfo | null>(null);

	const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

	const [refreshTokenState, setRefreshTokenState] = React.useState<CookieRefreshToken | null>(refreshToken || null);

	// const userSessionInfo = getLocalStorage<AuthSessionInfo>('user-session-info');

	const setToken = (newToken: string | null) => {
		setTokenState(newToken);
		if (newToken) {
			sessionStorage.setItem('token', newToken);
		} else {
			sessionStorage.removeItem('token');
		}
	};

	const loginAction = async (userPayload: LoginFormType, redirect: string) => {
		const signInResponse = await login({
			username: userPayload.username,
			password: userPayload.password,
			role: userPayload.role,
		}, redirect);
		console.log(signInResponse);
		if (signInResponse?.errorCode) {
			toast.showErrorToast(signInResponse?.errorMessage ?? 'Login failed');
			return;
		}
		setLocalStorage('user-session-info', signInResponse?.data);
		toast.showSuccessToast('Đăng nhập thành công');
		router.push(redirect);
	};

	const logout = () => {
		removeCookie('accessToken');
		removeLocalStorage('user-session-info');
		router.replace(paths.auth.login);
	}

	useEffect(() => {
		setAuthProfile(getLocalStorage<AuthSessionInfo>('user-session-info') || null);
	}, []);

	useLayoutEffect(() => {
		(async () => {
			const { cookieParse, hasCookie } = checkCookie();
			if (hasCookie) {
				const { accessToken } = cookieParse;
				!token && setToken(accessToken.access_token);

				// // console.log('userSessionInfo', userSessionInfo);
				// if (userSessionInfo) {
				// 	setAuthProfile(userSessionInfo);
				// }
			}
		})();
	}, []);

	useLayoutEffect(() => {
		if (!refreshToken) {
			return router.replace(paths.auth.login);
		}
		// Intercept request and add access token to header if it exists
		// If access token is expired, use refresh token to get a new access token
		axiosWithAuth.interceptors.request.use(
			async (requestConfig) => {
				// console.log('requestConfig', requestConfig);
				const { cookieParse, hasCookie } = checkCookie();
				console.log('cookieParse', cookieParse);
				if (hasCookie) {
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
					} else if (new Date() < new Date(refreshToken?.refreshToken?.expire_refresh_token)) {
						const response = await axios.post(
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
					}
				} else {
					router.replace(paths.auth.login);
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
						// alert(error.response?.data?.error);
						break;

					default:
						break;
				}

				return Promise.reject(error);
			}
		);

		setIsAuthenticated(!!token);
	}, []);

	return (
		<AuthContext.Provider value={{
			isAuthenticated,
			token,
			userSessionInfo: authProfile,
			setToken,
			loginAction,
			logout,
		}}>
			{children}
		</AuthContext.Provider>
	);
};

export default AuthProvider;