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
import ProductDashboard from '@container/dashboard/product/product-dashboard.tsx';
import ProductDashboardV1 from '@container/dashboard/product/product-dashboard-v1.tsx';

type PageProps = {
	params: {
		branchId: string;
		type: string;
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
								{/*<ProductDashboard branchId={params.branchId} type={params.type} />*/}
								<ProductDashboardV1 type={params.type} />
							</HeaderBarLayout>
						</MainLayout>
					</DashboardProvider>
				</ProfileProvider>
			</AppLayout>
		</RefreshCookieAuthProvider>
	);
};

export default Page;