
import { AdminSidebarLayout } from "@layout/admin-sidebar-layout"
import AppLayout from "@layout/app-layout"
import RefreshCookieAuthProvider from "@provider/refresh-cookie-provider"
import AdminDashboard from '@container/admin/admin-dashboard.tsx';
import { AdminProfileProvider } from "@provider/admin-profile-provider";

export default function Dashboard() {
	return (
		<RefreshCookieAuthProvider>
			<AppLayout>
				<AdminSidebarLayout>
					<AdminProfileProvider>
						<AdminDashboard />
					</AdminProfileProvider>
				</AdminSidebarLayout>
			</AppLayout>
		</RefreshCookieAuthProvider>
		)
}