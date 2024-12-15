'use server'

import React from 'react';
import { parseJson } from '@util/parse-json.ts';
import { cookies } from 'next/headers';
import AuthProvider from '@provider/auth-provider.tsx';

function RefreshCookieAuthProvider({children}: {children: React.ReactNode}) {
	const refreshTokenCookie = cookies().get('refreshToken')?.value;
	const cookieParse = parseJson(refreshTokenCookie || '');
	console.log('refresh:', cookieParse);
	return (
		<AuthProvider refreshToken={cookieParse}>
			{children}
		</AuthProvider>
	);
}

export default RefreshCookieAuthProvider;