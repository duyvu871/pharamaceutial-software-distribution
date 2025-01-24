
import { AdminSidebarLayout } from "@layout/admin-sidebar-layout"
import AppLayout from "@layout/app-layout"
import RefreshCookieAuthProvider from "@provider/refresh-cookie-provider"
import AdminDashboard from '@container/admin/admin-dashboard.tsx';
import ProtectHighEndAdmin from '@layout/protect/high-end-admin.tsx';
import { AdminProfileProvider } from '@provider/admin-profile-provider.tsx';
import { Suspense } from "react";

export default function DashBoard (){
	return (
		<RefreshCookieAuthProvider>
			<Suspense>
				<AppLayout>
					<AdminSidebarLayout>
						<ProtectHighEndAdmin>
							<AdminProfileProvider>
								<AdminDashboard />
							</AdminProfileProvider>
						</ProtectHighEndAdmin>
					</AdminSidebarLayout>
				</AppLayout>
			</Suspense>
		</RefreshCookieAuthProvider>
	)
}