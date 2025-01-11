'use client'

import React, { useEffect, useLayoutEffect, useState } from 'react';
import { getBranches } from '@api/branch.ts';
import { BranchType } from '@schema/branch-schema.ts';
import { useAtom } from 'jotai';
import { currentBranchAtom } from '@store/state/overview/branch.ts';
import { OverviewStat } from '@component/Stats/overview-stat.tsx';
import { CenterBox } from '@component/CenterBox';
import RevenueChart from '@component/Chart/revenue-chart.tsx';
import { Box, Group, LoadingOverlay, Stack } from '@mantine/core';
import TopSaleChart from '@component/Chart/top-sale-chart.tsx';
import DashboardActivity from '@component/Activity/dashboard-activity.tsx';
import NotiCard from '@component/Notification/noti-card.tsx';
import { useDashboard } from '@hook/dashboard/use-dasboard.ts';

function BranchDashboard({branchId}: {branchId: string}): JSX.Element {
	const {ready} = useDashboard();

	useEffect(() => {
		console.log(ready);
	}, [ready]);

	return (
		<Box pos={'relative'} className={'h-full bg-zinc-100 overflow-y-auto overflow-x-hidden'}>
			<LoadingOverlay visible={ready} zIndex={1000} overlayProps={{ radius: "sm", blur: 2 }} />
			<CenterBox
				className={'h-full bg-zinc-100 overflow-y-auto overflow-x-hidden'}
				classNames={{
					inner: 'p-5 flex flex-row justify-stretch gap-5 w-full max-w-full h-fit'
				}}
			>
				<Stack className={'flex-grow gap-5'}>
					<OverviewStat />
					<RevenueChart />
					<TopSaleChart />
					<h1>Branch Page</h1>
					<p>Branch ID: {branchId}</p>
				</Stack>
				<div className={'w-[200px] sm:w-[300px] lg:w-[400px] h-full'}>
					<Stack>
						<NotiCard />
						<DashboardActivity />
					</Stack>
				</div>
			</CenterBox>
		</Box>
	);
}

export default BranchDashboard;