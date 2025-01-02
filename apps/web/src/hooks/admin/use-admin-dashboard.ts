import { useContext } from 'react';
import { AdminDashboardContext } from '@provider/admin-dashboard-provider.tsx';

export const useAdminDashboard = () => {
	const context = useContext(AdminDashboardContext);
	if (!context) {
		throw new Error('useAdminDashboard must be used within a AdminDashboardProvider');
	}
	return context;
};