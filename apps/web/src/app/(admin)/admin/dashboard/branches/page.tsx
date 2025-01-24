
import { AdminSidebarLayout } from "@layout/admin-sidebar-layout"
import AppLayout from "@layout/app-layout"
import RefreshCookieAuthProvider from "@provider/refresh-cookie-provider"
import ProtectHighEndAdmin from '@layout/protect/high-end-admin.tsx';
import { AdminProfileProvider } from '@provider/admin-profile-provider.tsx';
import BranchDashboard from '@container/admin/branch-dashboard.tsx';

export default function DashBoard (){
	return (
		<RefreshCookieAuthProvider>
			<AppLayout>
				<ProtectHighEndAdmin>
					<AdminProfileProvider>
						<AdminSidebarLayout>
							<BranchDashboard />
						</AdminSidebarLayout>
					</AdminProfileProvider>
				</ProtectHighEndAdmin>
			</AppLayout>
		</RefreshCookieAuthProvider>
	)
}