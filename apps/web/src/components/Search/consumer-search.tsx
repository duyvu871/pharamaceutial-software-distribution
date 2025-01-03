import React, { useEffect, useState } from 'react';
import { useSearch } from '@hook/common/use-search.ts';
import { getProviders } from '@api/provider.ts';
import { useDashboard } from '@hook/dashboard/use-dasboard.ts';
import AutocompleteSearch from '@component/Autocomplete/base.tsx';
import { getConsumerList } from '@api/consumer.ts';
import { Button, Card, Divider, Grid, Group, Loader, Paper, ScrollArea, Stack, Table, TextInput, Title } from '@mantine/core';
import { useDebounce } from '@uidotdev/usehooks';
import { ConsumerAttributes } from '@schema/consumer-schema.ts';
import { Typography } from '@component/Typography';
import { parseJson } from '@util/parse-json.ts';
import { Label } from '@component/label';
import { genderVi } from '@global/locale.ts';
import { TableRender } from '@type/components/table.type.ts';
import { Product } from '@schema/product-schema.ts';
import { cn } from '@lib/tailwind-merge.ts';

type ConsumerAutocompletePropTypes = {
	makeOptional?: boolean;
	setValue?: (value: { name: string; id: string }) => void;
	key?: string;
};

function ConsumerSearch({ makeOptional, setValue, key }: ConsumerAutocompletePropTypes) {
	const [consumerSelected, setConsumerSelected] = useState<{ name: string; id: string }>({ name: '', id: '' });
	const [consumers, setConsumers] = useState<ConsumerAttributes[]>([]);
	const [recentConsumers, setRecentConsumers] = useState<ConsumerAttributes[]>([]);
	const [consumerSearch, setConsumerSearch] = useState<string>('');
	const consumerSearchDebounced = useDebounce(consumerSearch, 500);
	const { branchId } = useDashboard();
	const [isSearching, setIsSearching] = useState(false);

	const handleChooseConsumer = () => {
		setValue && setValue(consumerSelected);
	}

	const setRecentConsumer = (consumer: ConsumerAttributes) => {
		const newRecentConsumers = [consumer, ...recentConsumers.filter((item) => item.id !== consumer.id)].slice(0, 4);
		setRecentConsumers(newRecentConsumers);
		localStorage.setItem('recentConsumers', JSON.stringify(newRecentConsumers));
	}

	const handleConsumerSelect = (consumer: ConsumerAttributes | null) => {
		if (!consumer) {
			setConsumerSelected({ name: '', id: '' });
			return;
		}
		setConsumerSelected({ name: consumer.consumer_name, id: consumer.id })
		setRecentConsumer(consumer);
	}

	useEffect(() => {
		const recentConsumers = localStorage.getItem('recentConsumers');
		if (recentConsumers) {
			setRecentConsumers(parseJson<ConsumerAttributes[]>(recentConsumers) || []);
		}
	}, []);

	useEffect(() => {
		if (consumerSearchDebounced !== '') {
			setIsSearching(true);
			getConsumerList({
				search: consumerSearchDebounced,
				branchId: branchId,
				page: 1,
				limit: 5,
				orderBy: 'createdAt:ASC',
			}).then((data) => {
				setConsumers(data);
				setIsSearching(false);
			})
		}

	}, [consumerSearchDebounced]);

	useEffect(() => {
		console.log('consumerSelected', consumerSelected);
	}, [consumerSelected]);

	// useEffect(() => {
	// 	setValue && setValue(consumerSelected);
	// }, [consumerSelected]);

	const tableRenderData: TableRender<ConsumerAttributes> = [
		{
			title: 'Tên khách',
			render: (data) =>
				<Typography size="sm" color={'black'} weight={"semibold"}>{data.consumer_name}</Typography>
		},
		{
			title: "Số điện thoại",
			render: (data) =>
				<Typography size="sm" color={'dimmer'}>{data.phone_number || ""}</Typography>
		},
		{
			title: "Giới tính",
			render: (data) =>
				<Typography size="sm" color={'dimmer'}>{data.gender || ""}</Typography>
		},
		{
			title: "Ghi chú",
			render: (data) =>
				<Typography size="sm" color={'dimmer'} className={"max-w-40"}>{data.notes || ""}</Typography>
		}
	]

	return (
		<Stack className={"h-[600px]"}>
			<Grid gutter="md" h={"100%"}>
				<Grid.Col span={4}>
					{/*<Paper p="md" withBorder>*/}
					<Stack>
						<Typography size={"h5"}>Tìm kiếm</Typography>
						<TextInput
							size={"lg"}
							value={consumerSearch}
							onChange={(event) => setConsumerSearch(event.currentTarget.value)}
							placeholder="Nhập tên khách hàng, số điện thoại, email"
							rightSection={isSearching && <Loader size="xs" />}
						/>
						<Divider size="xs" label="Tìm kiếm gần đây" />
						<ScrollArea.Autosize mih={300} mah={400}>
							{recentConsumers.map((consumer) => (
								<Card
									key={consumer.id}
									withBorder
									mb="sm"
									style={{ cursor: 'pointer' }}
								>
									<Group justify={'space-between'}>
										<div
											onClick={() => handleConsumerSelect(consumer)}
										>
											<Typography weight={'semibold'} size={'h5'}>{consumer.consumer_name}</Typography>
											<Label className={'items-start'} size={'xs'} label={'Điện thoại:'}>
												<Typography size="sm" color={'dimmer'}>{consumer.phone_number}</Typography>
											</Label>
											<Label className={'items-start'} size={'xs'} label={'Giới tính:'}>
												<Typography size="sm"
																		color={'dimmer'}>{consumer.gender ? genderVi[consumer.gender] : ""}</Typography>
											</Label>
											<Label className={'items-start'} size={'xs'} label={'Ghi chú:'}>
												<Typography size="sm" color={'dimmer'}>{consumer.notes}</Typography>
											</Label>
										</div>
										<div>
											{(consumerSelected.id === consumer.id && consumerSelected.id) && (
												<Group>
													<Typography color={'primary'}>Đã chọn</Typography>
													<Typography
														onClick={() => handleConsumerSelect(null)}
														color={'alert'}
													>
														hủy
													</Typography>
												</Group>
											)}
										</div>
									</Group>
								</Card>
							))}
						</ScrollArea.Autosize>
					</Stack>
					{/*</Paper>*/}
				</Grid.Col>
				<Grid.Col span={8}>
					{/*<Paper p="md" withBorder>*/}
					<Stack p={5}>
						<Typography size={'h5'}>Kết quả tìm kiếm</Typography>
						<ScrollArea.Autosize mih={400} mah={600}>
							{isSearching ? (
								<Loader />
							) : consumers.length > 0 ? (
								<Table>
									<Table.Thead>
										<Table.Tr>
											{tableRenderData.map((item) => (
												<Table.Th>{item.title}</Table.Th>
											))}
										</Table.Tr>
									</Table.Thead>
									<Table.Tbody>
										{consumers.map((consumer) => (
											<Table.Tr
												key={consumer.id}
												onClick={() => handleConsumerSelect(consumer)}
												className={cn(
													"hover:bg-zinc-100 transition-all cursor-pointer",
													{
														"!bg-teal-100/50": (consumerSelected.id === consumer.id && consumerSelected.id)
													}
												)}
											>
												{tableRenderData.map((item) => (
													<Table.Td>{item.render(consumer)}</Table.Td>
												))}
											</Table.Tr>
										))}
									</Table.Tbody>
								</Table>
								) : (
								<Typography color={"dimmer"}>Không có kết quả phù hợp</Typography>
						)}
					</ScrollArea.Autosize>
		</Stack>
{/*</Paper>*/
}
</Grid.Col>
</Grid>
	<Group>
		{/*<Button onClick={() => setValue({name: '', id: ''})}>Clear</Button>*/}
		<Button color={"teal"} variant={"outline"} onClick={() => setConsumerSearch('')}>Hủy</Button>
		<Button
			disabled={makeOptional ? false : !consumerSelected.id}
			onClick={handleChooseConsumer}
			variant="filled"
			color="teal"
		>
			Chọn
		</Button>
	</Group>
</Stack>
);
}

export default ConsumerSearch;

	// <div>
	// 	{(consumerSelected.id === consumer.id && consumerSelected.id) && (
	// 		<Group>
	// 			<Typography color={'primary'}>Đã chọn</Typography>
	// 			<Typography
	// 				onClick={() => handleConsumerSelect(null)}
	// 				color={"alert"}
	// 			>
	// 				hủy
	// 			</Typography>
	// 		</Group>
	// 	)}
	// </div>
// </Group>
