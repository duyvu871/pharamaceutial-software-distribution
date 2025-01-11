import { Box, Button, Card, Flex, Group, LoadingOverlay, Stack } from '@mantine/core';
import { BarChart } from '@mantine/charts';
import React, { useLayoutEffect, useState } from 'react';
import { Typography } from '@component/Typography';
import { revenueChartMock } from 'src/_mock/chart-mock.ts';
import { RevenueChartList } from '@schema/chart-schema.ts';
import { revenueReportAtom } from '@store/state/overview/report.ts';
import { useAtom } from 'jotai';
import { useDisclosure } from '@mantine/hooks';

function RevenueChart() {
	const [revenue] = useAtom(revenueReportAtom);

	const [originRevenue, setOriginRevenue] = useState<number>();
	const [revenueData, setRevenueData] = useState<RevenueChartList>([]);
	const [activeUnit, setActiveUnit] = useState<'month' | 'week' | 'day'>('month');
	const [visible, { toggle, open, close }] = useDisclosure(false);

	const setRevenue = (unit: 'month' | 'week' | 'day') => {
		open();
		setRevenueData(revenueChartMock[unit]);
		close();
		setActiveUnit(unit);
	}

	useLayoutEffect(() => {
		if (!revenue) return;
		if (!revenue['month']) return;
		setRevenueData(revenue['month']);
		close();
		setActiveUnit('month');
	}, [revenue]);

	return (
		<Card shadow="sm" padding="lg" className={"gap-0"}>
			<Group className={"!items-center !justify-between w-full"}>
				<Typography  size={'h5'} weight={'semibold'}>
					Doanh thu theo tháng
				</Typography>
				<Group className={'gap-5'}>
					<Button size={'xs'} onClick={() => setRevenue('day')} variant={activeUnit === 'day' ? 'filled' : 'outline'} color={'teal'}>
						Ngày
					</Button>
					<Button size={'xs'} onClick={() => setRevenue('week')} variant={activeUnit === 'week' ? 'filled' : 'outline'} color={'teal'}>
						Tuần
					</Button>
					<Button size={'xs'} onClick={() => setRevenue('month')} variant={activeUnit === 'month' ? 'filled' : 'outline'} color={'teal'}>
						Tháng
					</Button>
				</Group>
			</Group>
			<Box pos={'relative'}>
				<LoadingOverlay visible={visible} zIndex={1000} overlayProps={{ radius: "sm", blur: 2 }} />
				<BarChart
					h={350}
					p={'xs'}
					tickLine="xy"
					gridAxis="xy"
					data={revenueData}
					dataKey={activeUnit}
					valueFormatter={
						(value) =>
							new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'vnd' }).format(value)
					}
					withBarValueLabel
					withLegend
					series={[
						{
							name: 'import',
							label: 'Nhập hàng',
							color: 'blue.6',
						},
						{
							name: 'sale',
							label: 'Bán hàng',
							color: 'red.6',
						},
					]}
				/>
			</Box>
		</Card>
	);
}

export default RevenueChart;