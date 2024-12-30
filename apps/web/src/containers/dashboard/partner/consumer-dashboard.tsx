'use client'

import { useLayoutEffect, useState } from 'react'
import { Table, Pagination, Select } from '@mantine/core'
import { Plus, Upload, FileSpreadsheet, RotateCw, Menu, EllipsisVertical } from 'lucide-react'
import { AddCustomerModal } from '@component/Modal/add-new-user.tsx';
import { getConsumerList } from '@api/consumer.ts';
import { cn } from '@lib/tailwind-merge.ts';
import { ConsumerAttributes } from '@schema/consumer-schema.ts';
import { genderVi } from '@global/locale.ts';

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

export default function CustomerDashboard({branchId}: {branchId: string}) {
	const [activePage, setActivePage] = useState(1);
	const [itemsPerPage, setItemsPerPage] = useState('20');
	const [consumers, setConsumers] = useState<ConsumerAttributes[]>([]);
	useLayoutEffect(() => {
		if (branchId) {
			getConsumerList({branchId, search: '', orderBy: 'createdAt:ASC', limit: 20, page: 1}).then(consumerList => {
				// const transformedData: Customer[] = consumerList.map(consumer => ({
				// 	id: consumer.id,
				// 	name: consumer.consumer_name,
				// 	phone: consumer.phone_number,
				// 	email: consumer.consumer_email || '',
				// 	totalSales: consumer.revenue,
				// 	debt: consumer.debit,
				// 	address: consumer.address || '',
				// 	gender: consumer.gender === 'female' ? 'Nữ' : 'Nam',
				// }));
				setConsumers(consumerList);
			})
		}
	}, [branchId]);

	return (
		<div className="w-full p-4">
			{/* Header */}
			<div className="flex justify-between items-center mb-6">
				<div className="flex items-center gap-4">
					<h1 className="text-xl font-medium">Danh sách khách hàng</h1>
					<button className="lg:hidden">
						<Menu className="w-6 h-6" />
					</button>
				</div>
				<div className="flex gap-2">
					<AddCustomerModal>
						<button className="flex items-center gap-2 bg-teal-500 text-white px-3 py-2 rounded-md hover:bg-teal-600">
							<Plus className="w-4 h-4" />
							<span>Thêm mới</span>
						</button>
					</AddCustomerModal>

					<button
						className="flex items-center gap-2 bg-teal-500/90 text-white px-3 py-2 rounded-md hover:bg-teal-600 transition-colors">
						<Upload className="w-4 h-4" />
						<span>Tải lên</span>
					</button>
					<button
						className="flex items-center gap-2 bg-teal-500/80 text-white px-3 py-2 rounded-md hover:bg-teal-600 transition-colors">
						<FileSpreadsheet className="w-4 h-4" />
						<span>Xuất Excel</span>
					</button>
					<button className="flex items-center gap-2 bg-teal-500 text-white px-3 py-2 rounded-md hover:bg-teal-600">
						<RotateCw className="w-4 h-4" />
						<span>Làm mới</span>
					</button>
				</div>
			</div>

			{/* Table */}
			<div className="overflow-x-auto bg-white rounded-md shadow">
				<Table striped highlightOnHover>
					<Table.Thead>
						<Table.Tr>
							<Table.Th className="whitespace-nowrap">#</Table.Th>
							<Table.Th className="whitespace-nowrap">Tên khách hàng</Table.Th>
							<Table.Th className="whitespace-nowrap">Số điện thoại</Table.Th>
							<Table.Th className="whitespace-nowrap">Email</Table.Th>
							<Table.Th className="whitespace-nowrap">Tổng doanh số</Table.Th>
							<Table.Th className="whitespace-nowrap">Nợ</Table.Th>
							<Table.Th className="whitespace-nowrap">Giới tính</Table.Th>
							<Table.Th className="whitespace-nowrap">Địa chỉ</Table.Th>
							<Table.Th className="whitespace-nowrap"></Table.Th>
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
							consumers.map((consumer, index) => (
								<Table.Tr key={consumer.id} h={60}>
									<Table.Td>{index + 1}</Table.Td>
									<Table.Td>{consumer.consumer_name}</Table.Td>
									<Table.Td>{consumer.phone_number}</Table.Td>
									<Table.Td>{consumer.consumer_email}</Table.Td>
									<Table.Td className={cn(`font-semibold ${Number(consumer.revenue) > 0 ? 'text-green-600' : 'text-zinc-700'}`)}>
										{Number(consumer.revenue).toLocaleString('vi-VN')} ₫</Table.Td>
									<Table.Td className={cn(`font-semibold ${Number(consumer.debit) > 0 ? 'text-red-400' : 'text-zinc-700'}`)}>
										{Number(consumer.debit).toLocaleString('vi-VN')} ₫</Table.Td>
									<Table.Td>{genderVi[consumer.gender]}</Table.Td>
									<Table.Td>{consumer.address}</Table.Td>
									<Table.Td>
										<AddCustomerModal data={consumer}>
											{/*<span >*/}
												<EllipsisVertical size={20}/>
											{/*</span>*/}
										</AddCustomerModal>
									</Table.Td>
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
	)
}

