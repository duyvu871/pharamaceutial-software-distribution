import React from 'react';
import AppLayout from '@layout/app-layout.tsx';
import RefreshCookieAuthProvider from '@provider/refresh-cookie-provider.tsx';
import DashboardOverview from '@container/dashboard/dashboard-overview.tsx';
import { ProfileProvider } from '@provider/profile-provider.tsx';

function Page() {
	return (
		<RefreshCookieAuthProvider>
			<AppLayout>
				{/*<ProfileProvider>*/}
					<DashboardOverview />
				{/*</ProfileProvider>*/}
			</AppLayout>
		</RefreshCookieAuthProvider>
	);
}

export default Page;