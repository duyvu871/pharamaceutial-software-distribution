"use client";

import RefreshCookieAuthProvider from '@provider/refresh-cookie-provider';
import React from 'react';
import AppLayout from '@layout/app-layout.tsx';
import HeaderBarLayout from '@layout/header-bar-layout.tsx';
import MainLayout from '@layout/main-layout.tsx';
import { ProfileProvider } from '@provider/profile-provider.tsx';
import { DashboardProvider } from '@provider/dashboard-provider.tsx';
import RetailDashboard from '@container/dashboard/sale/retail-dashboard.tsx';
import CustomerDashboard from '@container/dashboard/partner/consumer-dashboard.tsx';
import MembershipDashboard from '@container/dashboard/membership/membership-dashboard.tsx';
import BlockAccessRoleBaseLayout from '@layout/block-access-role-base-layout.tsx';

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
				<ProfileProvider>
					<DashboardProvider
						branchId={params.branchId}
						availableStates={{
							branchDetail: true,
						}}
					>
						<MainLayout>
							<HeaderBarLayout>
								<BlockAccessRoleBaseLayout roles={['admin', 'user']}>
									<MembershipDashboard branchId={params.branchId} />
								</BlockAccessRoleBaseLayout>
							</HeaderBarLayout>
						</MainLayout>
					</DashboardProvider>
				</ProfileProvider>
			</AppLayout>
		</RefreshCookieAuthProvider>
	);
};

export default Page;