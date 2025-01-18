'use client'

import { useLayoutEffect, useState } from 'react'
import { Table, Pagination, Select, Group } from '@mantine/core'
import { Plus, Upload, FileSpreadsheet, RotateCw, Menu, EllipsisVertical } from 'lucide-react'
import { AddCustomerModal } from '@component/Modal/add-new-consumer.tsx';
import { getConsumerList } from '@api/consumer.ts';
import { cn } from '@lib/tailwind-merge.ts';
import { ConsumerAttributes } from '@schema/consumer-schema.ts';
import { genderVi } from '@global/locale.ts';
import { useAuth } from '@hook/auth';
import { CenterBox } from '@component/CenterBox';
import { TableRender } from '@type/components/table.type.ts';
import { Product } from '@schema/product-schema.ts';
import { Typography } from '@component/Typography';
import { ProviderModal } from '@component/Modal/provider-modal.tsx';
import { Provider } from '@schema/provider-schema.ts';
import { getProviders } from '@api/provider.ts';
import { ProviderForm } from '@component/Form/provider-form.tsx';

interface Customer {
	id: string
	name: string
	phone: string
	email: string
	address: string
	gender: string
	totalSales: number
	debt: number
}

export default function ProviderDashboard({branchId}: {branchId: string}) {
	const { isAuthenticated } = useAuth();
	const [activePage, setActivePage] = useState(1);
	const [itemsPerPage, setItemsPerPage] = useState('20');
	const [consumers, setConsumers] = useState<Provider[]>([]);
	useLayoutEffect(() => {
		if (branchId) {
			getProviders({branchId, perPage: 20, search: '', orderBy: 'createdAt:DESC', limit: 20, page: 1}).then(providerList => {
				setConsumers(providerList);
			})
		}
	}, [branchId]);

	const reloadConsumerList = () => {
		getProviders({branchId, perPage: 20, search: '', orderBy: 'createdAt:DESC', limit: 20, page: 1}).then(providerList => {
			setConsumers(providerList);
		})
	}

	const addNewConsumer = (data: Provider) => {
		setConsumers((prev) => [data, ...prev]);
	}

	const updateConsumer = (data: Provider) => {
		setConsumers((prev) => prev.map(consumer => consumer.id === data.id ? data : consumer));
	}

	if (!isAuthenticated) {
		return <></>;
	}

	const tableRenderData: TableRender<Provider> = [
		{
			title: 'Tên nhà cung cấp',
			render: (provider) => provider.companyName
		},
		{
			title: 'Số điện thoại',
			render: (provider) => provider.phoneNumber
		},
		{
			title: 'Email',
			render: (provider) => provider.email
		},
		{
			title: 'Địa chỉ',
			render: (provider) => provider.address
		},
		{
			title: 'Mã số thuế',
			render: (provider) => provider.taxCode
		},
		{
			title: '',
			render: (provider) => (
				<ProviderModal data={provider} onSubmit={updateConsumer}>
					{/*<span >*/}
					<EllipsisVertical size={20}/>
					{/*</span>*/}
				</ProviderModal>
			)
		}
	]

	return (
		<CenterBox
			className={'flex-1 bg-zinc-100 h-full overflow-hidden'}
			classNames={{
				inner: 'flex flex-col w-full max-w-full h-full',
			}}
		>
			<Group align={'start'} className="h-full overflow-hidden !flex-nowrap" gap={0}>
				<div className="flex-1 p-4 h-full flex flex-col">
					{/* Header */}
					<div className="flex justify-between items-center mb-6">
						<div className="flex items-center gap-4">
							<h1 className="text-xl font-medium">Danh sách nhà cung cấp</h1>
							<button className="lg:hidden">
								<Menu className="w-6 h-6" />
							</button>
						</div>
						<div className="flex gap-2">
							<ProviderModal onSubmit={addNewConsumer}>
								<button className="flex items-center gap-2 bg-teal-500 text-white px-3 py-2 rounded-md hover:bg-teal-600">
									<Plus className="w-4 h-4" />
									<span>Thêm mới</span>
								</button>
							</ProviderModal>

							<button
								className="flex items-center gap-2 bg-teal-500/90 text-white px-3 py-2 rounded-md hover:bg-teal-600 transition-colors">
								<Upload className="w-4 h-4" />
								<span>Tải lên</span>
							</button>
							{/*<button*/}
							{/*	className="flex items-center gap-2 bg-teal-500/80 text-white px-3 py-2 rounded-md hover:bg-teal-600 transition-colors">*/}
							{/*	<FileSpreadsheet className="w-4 h-4" />*/}
							{/*	<span>Xuất Excel</span>*/}
							{/*</button>*/}
							<button
								className="flex items-center gap-2 bg-teal-500 text-white px-3 py-2 rounded-md hover:bg-teal-600"
								onClick={reloadConsumerList}
							>
								<RotateCw className="w-4 h-4" />
								<span>Làm mới</span>
							</button>
						</div>
					</div>
					{/* Table */}
					<div className="overflow-y-auto bg-white rounded-md shadow relative">
						<Table striped highlightOnHover className={"!rounded-md"}>
							<Table.Thead h={"fit-content"}>
								<Table.Tr className={""}>
									<Table.Th className="bg-white sticky top-0 whitespace-nowrap">#</Table.Th>
									{/*<Table.Th className="bg-white sticky top-0  whitespace-nowrap">Tên khách hàng</Table.Th>*/}
									{/*<Table.Th className="bg-white sticky top-0  whitespace-nowrap">Số điện thoại</Table.Th>*/}
									{/*<Table.Th className="bg-white sticky top-0  whitespace-nowrap">Email</Table.Th>*/}
									{/*<Table.Th className="bg-white sticky top-0  whitespace-nowrap">Tổng doanh số</Table.Th>*/}
									{/*<Table.Th className="bg-white sticky top-0  whitespace-nowrap">Nợ</Table.Th>*/}
									{/*<Table.Th className="bg-white sticky top-0 whitespace-nowrap">Giới tính</Table.Th>*/}
									{/*<Table.Th className="bg-white sticky top-0 whitespace-nowrap">Địa chỉ</Table.Th>*/}
									{/*<Table.Th className="bg-white sticky top-0 whitespace-nowrap"></Table.Th>*/}
									{tableRenderData.map((data, index) => (
										<Table.Th key={`th-${data.title}`} className="bg-white sticky top-0 whitespace-nowrap">{data.title}</Table.Th>
									))}
								</Table.Tr>
							</Table.Thead>
							<Table.Tbody>
								{consumers.length === 0 ? (
									<Table.Tr>
										<Table.Td colSpan={7} className="text-center py-4">
											Không có dữ liệu
										</Table.Td>
									</Table.Tr>
								) : (
									consumers.map((provider, index) => (
										<Table.Tr key={provider.id} h={60}>
											<Table.Td>{index + 1}</Table.Td>
											{/*<Table.Td>{consumer.consumer_name}</Table.Td>*/}
											{/*<Table.Td>{consumer.phone_number}</Table.Td>*/}
											{/*<Table.Td>{consumer.consumer_email}</Table.Td>*/}
											{/*<Table.Td className={cn(`font-semibold ${Number(consumer.revenue) > 0 ? 'text-green-600' : 'text-zinc-700'}`)}>*/}
											{/*	{Number(consumer.revenue).toLocaleString('vi-VN')} ₫</Table.Td>*/}
											{/*<Table.Td className={cn(`font-semibold ${Number(consumer.debit) > 0 ? 'text-red-400' : 'text-zinc-700'}`)}>*/}
											{/*	{Number(consumer.debit).toLocaleString('vi-VN')} ₫</Table.Td>*/}
											{/*<Table.Td>{consumer.gender ? genderVi[consumer.gender] : ""}</Table.Td>*/}
											{/*<Table.Td>{consumer.address}</Table.Td>*/}
											{/*<Table.Td>*/}
											{/*	<AddCustomerModal data={consumer}>*/}
											{/*		/!*<span >*!/*/}
											{/*			<EllipsisVertical size={20}/>*/}
											{/*		/!*</span>*!/*/}
											{/*	</AddCustomerModal>*/}
											{/*</Table.Td>*/}
											{tableRenderData.map((data, index) => (
												<Table.Td key={`td-${provider.id}-${index}`}>{data.render(provider)}</Table.Td>
											))}
										</Table.Tr>
									))
								)}
							</Table.Tbody>
						</Table>
					</div>

					{/* Pagination */}
					<div className="flex justify-between items-center mt-4">
						<div className="flex items-center gap-2">
							<span className="text-sm text-gray-600">Items per page:</span>
							<Select
								value={itemsPerPage}
								onChange={(value) => setItemsPerPage(value || '20')}
								data={['10', '20', '30', '50'].map(value => ({ value, label: value }))}
								styles={{
									input: {
										width: '70px',
									},
								}}
							/>
							<span className="text-sm text-gray-600">
								0 of 0
							</span>
						</div>
						<Pagination
							value={activePage}
							onChange={setActivePage}
							total={1}
							siblings={1}
							boundaries={1}
						/>
					</div>
				</div>
			</Group>
		</CenterBox>
	)
}

