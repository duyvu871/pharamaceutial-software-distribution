import React, { Suspense } from 'react';
import AuthProvider from '@provider/auth-provider.tsx';
import Login from '@container/auth/login.tsx';
import AppLayout from '@layout/app-layout.tsx';
import RefreshCookieProvider from '@provider/refresh-cookie-provider.tsx';
import RefreshCookieAuthProvider from '@provider/refresh-cookie-provider.tsx';
import { ProfileProvider } from '@provider/profile-provider.tsx';

function Page() {
	return (
		<RefreshCookieAuthProvider>
			<Suspense>
				<AppLayout>
					<Login />
				</AppLayout>
			</Suspense>
		</RefreshCookieAuthProvider>
	);
}

export default Page;