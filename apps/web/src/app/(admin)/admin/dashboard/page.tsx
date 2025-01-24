
import { AdminSidebarLayout } from "@layout/admin-sidebar-layout"
import AppLayout from "@layout/app-layout"
import RefreshCookieAuthProvider from "@provider/refresh-cookie-provider"
import AdminDashboard from '@container/admin/admin-dashboard.tsx';
import { AdminProfileProvider } from "@provider/admin-profile-provider";
import { Suspense } from "react";

export default function Dashboard() {
	return (
		<RefreshCookieAuthProvider>
			<Suspense>
				<AppLayout>
					<AdminSidebarLayout>
						<AdminProfileProvider>
							<AdminDashboard />
						</AdminProfileProvider>
					</AdminSidebarLayout>
				</AppLayout>
			</Suspense>
		</RefreshCookieAuthProvider>
		)
}