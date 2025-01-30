
import { AdminSidebarLayout } from "@layout/admin-sidebar-layout"
import AppLayout from "@layout/app-layout"
import RefreshCookieAuthProvider from "@provider/refresh-cookie-provider"
import AdminDashboard from '@container/admin/admin-dashboard.tsx';
import ProtectHighEndAdmin from '@layout/protect/high-end-admin.tsx';
import { AdminProfileProvider } from '@provider/admin-profile-provider.tsx';
import { Suspense } from "react";
import AdminHeaderToolbar from '@component/Header/admin-header.tsx';

export default function DashBoard (){
	return (
		<RefreshCookieAuthProvider>
			<Suspense>
				<AppLayout>
					<ProtectHighEndAdmin>
						<AdminProfileProvider>
							<AdminSidebarLayout>
								<AdminHeaderToolbar />
								<AdminDashboard />
							</AdminSidebarLayout>
						</AdminProfileProvider>
					</ProtectHighEndAdmin>
				</AppLayout>
			</Suspense>
		</RefreshCookieAuthProvider>
	)
}