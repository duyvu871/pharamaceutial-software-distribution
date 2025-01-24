"use client";

import React, { Suspense } from 'react';
import AppLayout from '@layout/app-layout.tsx';
import RefreshCookieAuthProvider from '@provider/refresh-cookie-provider.tsx';
import AdminLoginForm from '@container/admin/auth/login.tsx';
import { AdminSidebarLayout } from '@layout/admin-sidebar-layout.tsx';

function Page() {
	return (
		<RefreshCookieAuthProvider>
			<Suspense>
				<AppLayout>
					{/*<AdminSidebarLayout>*/}
						<AdminLoginForm />
					{/*</AdminSidebarLayout>*/}
					{/*<ProfileProvider>*/}
					{/*</ProfileProvider>*/}
				</AppLayout>
			</Suspense>
		</RefreshCookieAuthProvider>
	);
}

export default Page;