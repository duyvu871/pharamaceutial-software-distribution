// import { IconArrowDownRight, IconArrowUpRight } from '@tabler/icons-react';
import { LuArrowDownLeft, LuArrowUpRight } from "react-icons/lu";
import { Button, Card, Flex, Group, Paper, Select, SimpleGrid, Text, ThemeIcon } from '@mantine/core';
import { Typography } from '@component/Typography';
import { useState } from "react";
import '@style/button.css'
import { Label } from '@component/label';
import { upperFirst } from "@mantine/hooks";
import { statAtom } from '@store/state/overview/report.ts';
import { useAtom } from "jotai";
// import classes from './StatsGridIcons.module.css';

const data = {
	day: [
		{ title: 'Doanh thu', value: '$13,456', diff: 34 },
		{ title: 'Lợi nhuận', value: '$4,145', diff: -13 },
		{ title: 'Khách hàng', value: '745', diff: 18 },
	],
	week: [
		{ title: 'Doanh thu', value: '$130,456', diff: 34 },
		{ title: 'Lợi nhuận', value: '$34,145', diff: -13 },
		{ title: 'Khách hàng', value: '2745', diff: 18 },
	],
	month: [
		{ title: 'Doanh thu', value: '$1,130,456', diff: 34 },
		{ title: 'Lợi nhuận', value: '$134,145', diff: -13 },
		{ title: 'Khách hàng' , value: '5345', diff: 18 },
	]
}

const subData = {
	day: [
		{ title: 'Lượng trả hàng', value: '10', },
		{ title: 'Hóa đơn', value: '$4,145', diff: -13 },
		// { title: 'Khách hàng', value: '745', diff: 18 },
	],
	week: [
		{ title: 'Lượng trả hàng', value: '10', },
		{ title: 'Hóa đơn', value: '$34,145', diff: -13 },
		// { title: 'Khách hàng', value: '2745', diff: 18 },
	],
	month: [
		{ title: 'Lượng trả hàng', value: '10', },
		{ title: 'Hóa đơn', value: '$134,145', diff: -13 },
		// { title: 'Khách hàng' , value: '5345', diff: 18 },
	]
};

const unitOptions = [
	{ label: 'ngày', value: 'day' },
	{ label: 'tuần', value: 'week' },
	{ label: 'tháng', value: 'month' },
];

export function OverviewStat() {
	const [unit, setUnit] = useState<'month'|'day'|'week'>('month');
	const [stats] = useAtom(statAtom);

	const statNodes = stats?.[unit] && stats[unit].map((stat) => {
		const DiffIcon = (stat.diff || 0) > 0 ? LuArrowUpRight : LuArrowDownLeft;
		const displayUnit = unitOptions.find((option) => option.value === unit)?.label;
		return (
			<Paper withBorder p="md" radius="sm" key={stat.title} className={'!bg-emerald-500/10'}>
				<Group justify="apart">
					<div>
						<Text c="dimmed" tt="uppercase" fw={700} fz="xs" >
							{stat.title}
						</Text>
						<Text fw={700} fz="xl">
							{stat.value.toLocaleString()}
						</Text>
					</div>
					<ThemeIcon
						color="green"
						variant="light"
						style={{
							color: (stat.diff || 0) > 0 ? 'var(--mantine-color-teal-6)' : 'var(--mantine-color-red-6)',
						}}
						size={38}
						radius="md"
					>
						<DiffIcon size={28} />
					</ThemeIcon>
				</Group>
				<Text c="dimmed" fz="sm" mt="md">
					<Text component="span" c={(stat.diff || 0) > 0 ? 'teal' : 'red'} fw={700}>
						{stat.diff}%
					</Text>{' '}
					{(stat.diff || 0) > 0 ? 'tăng' : 'giảm'} so với {displayUnit} trước
				</Text>
			</Paper>
		);
	});

	return (
		<Card shadow={'xs'} h={'fit-content'} className={'flex flex-col gap-5'}>
			<Flex className={'justify-between items-center'}>
				<Typography size={'h5'} weight={'semibold'}>
					Kết quả bán hàng
				</Typography>
				<Group>
					<Label label={'Đơn vị:'}>
						<Select
							w={120}
							size={'sm'}
							value={unit}
							data={[
								...unitOptions.map((option) => ({ value: option.value, label: upperFirst(option.label) })),
							]}
							defaultValue={unit}
							onChange={(value) => setUnit(value as any)}
						/>
					</Label>
				</Group>
			</Flex>
			{/*<Group className={'flex-nowrap'}>*/}
				<SimpleGrid cols={{ base: 1, sm: 3 }} className={'!gap-3'}>{statNodes}</SimpleGrid>
			{/*</Group>*/}
		</Card>
	);
}