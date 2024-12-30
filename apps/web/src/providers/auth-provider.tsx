"use client";

import React, { createContext, useEffect, useState, useMemo, useCallback } from 'react';
import axios from 'axios';
import axiosWithAuth, { checkCookie } from '@lib/axios';
import { removeCookie, setCookie } from '@util/cookie.ts';
import { useRouter } from 'next/navigation';
import { paths } from '@route/path.ts';
import { AuthSessionInfo, LoginFormType } from '@schema/user-schema.ts';
import useToast from '@hook/client/use-toast-notification.ts';
import { login } from '@api/auth.ts';
import { CookieRefreshToken } from '@type/token.ts';
import { getLocalStorage, removeLocalStorage, setLocalStorage } from '@util/localstorage.ts';

type AuthProviderProps = {
	children: React.ReactNode;
	refreshToken?: CookieRefreshToken | null;
};

export type IAuthContext = {
	isAuthenticated: boolean;
	userSessionInfo: AuthSessionInfo | null;
	token: string | null;
	setToken: (newToken: string | null) => void;
	loginAction: (userPayload: LoginFormType, redirect: string) => Promise<void>;
	logout: () => void;
};

export const AuthContext = createContext<IAuthContext>({
	isAuthenticated: false,
	token: null,
	userSessionInfo: null,
	setToken: () => { },
	loginAction: () => Promise.resolve(),
	logout: () => { },
});

const AuthProvider = ({ children, refreshToken }: AuthProviderProps) => {
	const toast = useToast();
	const router = useRouter();
	const [token, setTokenState] = useState<string | null>(null);
	const [authProfile, setAuthProfile] = useState<AuthSessionInfo | null>(null);
	const [refreshTokenState, setRefreshTokenState] = useState<CookieRefreshToken | null>(refreshToken || null);
	const [isRefreshing, setIsRefreshing] = useState(false);
	const [isAuthenticated, setIsAuthenticated] = useState(false);


	const setToken = useCallback((newToken: string | null) => {
		setTokenState(newToken);
		if (newToken) {
			sessionStorage.setItem('token', newToken);
		} else {
			sessionStorage.removeItem('token');
		}
	}, []);

	const loginAction = async (userPayload: LoginFormType, redirect: string) => {
		try {
			const signInResponse = await login({
				username: userPayload.username,
				password: userPayload.password,
				role: userPayload.role,
			}, redirect);

			if (signInResponse?.errorCode) {
				toast.showErrorToast(signInResponse?.errorMessage ?? 'Login failed');
				return;
			}

			setLocalStorage('user-session-info', signInResponse.data);
			setAuthProfile(signInResponse.data);
			toast.showSuccessToast('Đăng nhập thành công');
			router.push(redirect);

		} catch (error) {
			console.error("Login error:", error)
			toast.showErrorToast('Login failed');
		}

	};

	const logout = useCallback(() => {
		removeCookie('accessToken');
		removeLocalStorage('user-session-info');
		setAuthProfile(null);
		setToken(null);
		router.replace(paths.auth.login);
	}, [router, setToken]);


	useEffect(() => {
		const { cookieParse, hasCookie } = checkCookie();
		console.log('cookieParse', cookieParse);
		if (hasCookie) {
			const { accessToken } = cookieParse;
			!token && setToken(accessToken.access_token);
		}
	}, []);

	useEffect(() => {
		console.log("block 1");
		const userSessionInfo = getLocalStorage<AuthSessionInfo>('user-session-info')
		if (userSessionInfo) {
			setAuthProfile(userSessionInfo);
		}
	}, []);

	useEffect(() => {
		console.log('refreshToken', refreshToken);
		if (!refreshToken) {
			return router.replace(paths.auth.login);
		}

		const requestInterceptor = axiosWithAuth.interceptors.request.use(
			async (requestConfig) => {

				// if (isRefreshing) return requestConfig; // Prevent multiple refresh requests

				const { cookieParse, hasCookie } = checkCookie();

				if (!hasCookie) {
					router.replace(paths.auth.login);
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
					setIsRefreshing(true);
					try {
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
						setToken(data.accessToken.access_token);


					} catch (error) {
						removeCookie("accessToken");
						setToken(null);
						router.replace(paths.auth.login);
						return Promise.reject(error);
					} finally {
						setIsRefreshing(false);
					}

					return requestConfig;
				} else {
					removeCookie("accessToken");
					setToken(null);
					router.replace(paths.auth.login);
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
				switch (error?.response?.status) {
					case 401:
						removeCookie("accessToken");
						setToken(null);
						router.replace(paths.auth.login);
						break;
					// case 400: //TODO handle case 400 if required
					//     break;
					default:
						break;
				}

				return Promise.reject(error);
			}
		);

		setIsAuthenticated(true);

	}, [refreshToken, router, setToken, isRefreshing, token]);


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