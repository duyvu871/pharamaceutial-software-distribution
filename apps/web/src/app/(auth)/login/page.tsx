import React, { Suspense } from 'react';
import AuthProvider from '@provider/auth-provider.tsx';
import Login from '@container/auth/login.tsx';
import AppLayout from '@layout/app-layout.tsx';

function Page() {
	return (
		<Suspense>
			<AppLayout>
					<Login />
			</AppLayout>
		</Suspense>
	);
}

export default Page;