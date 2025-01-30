'use client';

import React, {createContext, useLayoutEffect, useState} from 'react';
import { useProfile } from '@hook/dashboard/use-profile.ts';
import { currentBranchAtom, qrCodeAtom } from '@store/state/overview/branch.ts';
import { revenueReportAtom, statAtom, topSaleReportAtom } from '@store/state/overview/report.ts';
import { activityAtom } from '@store/state/overview/notifocation.ts';
import { getBranches } from '@api/branch.ts';
import { BranchType } from '@schema/branch-schema.ts';
import { getActivities } from '@api/notification.ts';
import { getRevenueReportChart, getStat, getTopSales } from '@api/report.ts';
import { useAtom } from 'jotai';
import { useDisclosure } from '@mantine/hooks';
import BranchNotFound from '@component/Execption/branch-not-found.tsx';

type DashboardProviderProps = {
    children: React.ReactNode;
		branchId: string;
		availableStates?: Partial<Record<
			'branchDetail' | 'revenueReport' | 'activities' | 'topSale' | 'stats',
			boolean>>
};

export type DashboardContextType = {
	ready: boolean;
	branchId: string;
}

export const DashboardContext = createContext<DashboardContextType>({
	ready: false,
	branchId: '',
});

export const DashboardProvider = ({children, branchId, availableStates}: DashboardProviderProps) => {
	const {profile} = useProfile();
	const [branch_id, setBranchId] = useState<string>(branchId);
	const [currentBranch, setBranchDetail] = useAtom(currentBranchAtom);
	const [, setQRCode] = useAtom(qrCodeAtom);
	const [, setRevenueReport] = useAtom(revenueReportAtom);
	const [, setActivities] = useAtom(activityAtom);
	const [, setTopSale] = useAtom(topSaleReportAtom);
	const [, setStats] = useAtom(statAtom);

	const [visible, {open, close}] = useDisclosure(false);

	const openOverlay = () => !visible && open();
	const closeOverlay = () => visible && close();

	useLayoutEffect(() => {
		(async () => {
			// openOverlay();
			if (!profile) return;
			// closeOverlay();

			// get branch detail
			availableStates?.branchDetail && getBranches(branchId)
				.then((branchDetails) => {
					console.log('details', branchDetails);
					// openOverlay();
					setBranchDetail(branchDetails as BranchType);
					setQRCode(branchDetails?.store?.store_asset);
				})

			// get activities
			availableStates?.activities && getActivities({ page: 1, limit: 10, order: 'createdAt:desc' }).then((activities) => {
				console.log('activities', activities);
				// closeOverlay();
				setActivities(activities);
			});
			// get revenue report
			availableStates?.revenueReport && getRevenueReportChart({ from: '2021-01-01', to: '2021-12-31' }).then((revenueReport) => {
				console.log('revenue', revenueReport);
				if (!revenueReport.errorCode) {
					// closeOverlay();
					setRevenueReport(revenueReport);
				}
			});
			// get top sale
			availableStates?.topSale && getTopSales({ from: '2021-01-01', to: '2021-12-31' }).then((topSales) => {
				console.log('topSales', topSales);
				// closeOverlay();
				setTopSale(topSales);
			});
			availableStates?.stats && getStat({ from: '2021-01-01', to: '2021-12-31', type: 'main' }).then((stats) => {
				console.log('stats', stats);
				// closeOverlay();
				setStats(stats);
			});
		})()
	}, [profile]);

	if (!currentBranch && visible) return <BranchNotFound />

	return (
			<DashboardContext.Provider value={{
				ready: visible,
				branchId: branch_id,
			}}>
		 		{children}
			</DashboardContext.Provider>
	);
};