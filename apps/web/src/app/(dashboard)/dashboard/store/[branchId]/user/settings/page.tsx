"use client";

import React from 'react';
import AppLayout from '@layout/app-layout.tsx';
import RefreshCookieAuthProvider from '@provider/refresh-cookie-provider.tsx';
import UserSetting from '@container/dashboard/user/user-setting.tsx';
import { ProfileProvider } from '@provider/profile-provider.tsx';
import { DashboardProvider } from '@provider/dashboard-provider.tsx';
import MainLayout from '@layout/main-layout.tsx';
import HeaderBarLayout from '@layout/header-bar-layout.tsx';
type PageProps = {
	params: {
		branchId: string;
	};
}

const Page = (
	{ params }: PageProps
) => {
	return (
		<RefreshCookieAuthProvider>
			<AppLayout>
				{/*<ProfileProvider>*/}
				<ProfileProvider>
					<DashboardProvider
						branchId={params.branchId}
						availableStates={{
							branchDetail: true,
						}}
					>
						<MainLayout>
							<HeaderBarLayout>
								<UserSetting />
							</HeaderBarLayout>
						</MainLayout>
					</DashboardProvider>
				</ProfileProvider>
				{/*</ProfileProvider>*/}
			</AppLayout>
		</RefreshCookieAuthProvider>
	);
}

export default Page;