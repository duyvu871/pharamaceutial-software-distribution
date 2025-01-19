import RefreshCookieAuthProvider from '@provider/refresh-cookie-provider.tsx';
import React from 'react';
import AppLayout from '@layout/app-layout.tsx';
import HeaderBarLayout from '@layout/header-bar-layout.tsx';
import MainLayout from '@layout/main-layout.tsx';
import { ProfileProvider } from '@provider/profile-provider.tsx';
import { DashboardProvider } from '@provider/dashboard-provider.tsx';
import RetailDashboard from '@container/dashboard/sale/retail-dashboard.tsx';
import FeatureComingSoon from '@container/updating/feature-coming-soon.tsx';
import ReportFinance from '@container/dashboard/report/report-finance.tsx';

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
								<ReportFinance />
							</HeaderBarLayout>
						</MainLayout>
					</DashboardProvider>
				</ProfileProvider>
			</AppLayout>
		</RefreshCookieAuthProvider>
	);
};

export default Page;