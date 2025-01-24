
import { AdminSidebarLayout } from "@layout/admin-sidebar-layout"
import AppLayout from "@layout/app-layout"
import RefreshCookieAuthProvider from "@provider/refresh-cookie-provider"
import AdminDashboard from '@container/admin/admin-dashboard.tsx';
import ProtectHighEndAdmin from '@layout/protect/high-end-admin.tsx';
import { AdminProfileProvider } from '@provider/admin-profile-provider.tsx';
import UserDashboard from '@container/admin/user-dashboard.tsx';

export default function DashBoard (){
	return (
		<RefreshCookieAuthProvider>
			<AppLayout>
					<ProtectHighEndAdmin>
						<AdminProfileProvider>
							<AdminSidebarLayout>
								<UserDashboard />
							</AdminSidebarLayout>
						</AdminProfileProvider>
					</ProtectHighEndAdmin>
			</AppLayout>
		</RefreshCookieAuthProvider>
	)
}