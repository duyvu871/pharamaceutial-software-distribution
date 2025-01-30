
import { AdminSidebarLayout } from "@layout/admin-sidebar-layout"
import AppLayout from "@layout/app-layout"
import RefreshCookieAuthProvider from "@provider/refresh-cookie-provider"
import AdminDashboard from '@container/admin/admin-dashboard.tsx';
import { AdminProfileProvider } from "@provider/admin-profile-provider";
import { Suspense } from "react";
import DashboardOverview from '@container/admin/dashboard-overview.tsx';
import ProtectHighEndAdmin from '@layout/protect/high-end-admin.tsx';
import AdminHeaderToolbar from '@component/Header/admin-header.tsx';
import BranchDashboard from '@container/admin/branch-dashboard.tsx';

export default function Dashboard() {
	return (
		<RefreshCookieAuthProvider>
			<Suspense>
				<AppLayout>
					<ProtectHighEndAdmin blockRender={false}>
						<AdminProfileProvider>
								<AdminSidebarLayout>
									<AdminHeaderToolbar />
									<DashboardOverview />
								</AdminSidebarLayout>
							</AdminProfileProvider>
					</ProtectHighEndAdmin>
				</AppLayout>
			</Suspense>
		</RefreshCookieAuthProvider>
		)
}