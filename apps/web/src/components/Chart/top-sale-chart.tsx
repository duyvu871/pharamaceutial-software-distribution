import { BarChart } from '@mantine/charts';
import { Box, Button, Card, Group, LoadingOverlay } from '@mantine/core';
import React, { useLayoutEffect, useState } from 'react';
// import { topSaleData} from 'src/_mock/chart-mock.ts';
import { Typography } from '@component/Typography';
import { topSaleReportAtom } from '@store/state/overview/report.ts';
import { useAtom } from 'jotai';
import { useDisclosure } from '@mantine/hooks';

const attributes = {
	byAmount: 'saleAmount',
	byQuantity: 'quantitySold',
}
const attributesLabel = {
	byAmount: 'Doanh thu',
	byQuantity: 'Số lượng',
}

function TopSaleChart() {
	const [topSales] = useAtom(topSaleReportAtom);

	const [visible, { toggle, open, close }] = useDisclosure(false);

	const [activeMetric, setActiveMetric] = useState<'byAmount' | 'byQuantity'>('byAmount');

	const setTopSale = (metric: 'byAmount' | 'byQuantity') => {
		open();
		setActiveMetric(metric);
		close();
	}

	useLayoutEffect(() => {
		if (!topSales) return;
		close();
	}, [topSales]);

	return (
		<Card shadow="sm" padding="lg">
			<Group className={"!items-center !justify-between w-full"}>
				<Typography  size={'h5'} weight={'semibold'}>
					Top sản phẩm bán chạy
				</Typography>
				<Group className={'gap-5'}>
					<Button size={'xs'} onClick={() => setTopSale('byAmount')} variant={activeMetric === 'byAmount' ? 'filled' : 'outline'} color={'teal'}>
						Doanh thu
					</Button>
					<Button size={'xs'} onClick={() => setTopSale('byQuantity')} variant={activeMetric === 'byQuantity' ? 'filled' : 'outline'} color={'teal'}>
						Số lượng
					</Button>
				</Group>
			</Group>
			<Box pos={'relative'}>
				<LoadingOverlay visible={visible} zIndex={1000} overlayProps={{ radius: "sm", blur: 2 }} />
				<BarChart
					h={350}
					p={'xs'}
					data={topSales}
					dataKey={'productName'}
					orientation="vertical"
					yAxisProps={{ width: 60 }}
					// barProps={{ radius: 10 }}
					series={[
						{ name: attributes[activeMetric], label: attributesLabel[activeMetric], color: 'blue.6' }
					]}
				/>
			</Box>
		</Card>
	);
}

export default TopSaleChart;