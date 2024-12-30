'use client'

import React from 'react';
import { parseJson } from '@util/parse-json.ts';
// import { cookies } from 'next/headers';
import AuthProvider from '@provider/auth-provider.tsx';
import { getCookie } from '@util/cookie.ts';

function RefreshCookieAuthProvider({children}: {children: React.ReactNode}) {
	const refreshTokenCookie = getCookie('refreshToken');
	const cookieParse = parseJson(refreshTokenCookie || '');
	console.log('refresh:', cookieParse);
	return (
		<AuthProvider refreshToken={cookieParse}>
			{children}
		</AuthProvider>
	);
}

export default RefreshCookieAuthProvider;