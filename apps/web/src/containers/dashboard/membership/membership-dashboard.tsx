'use client'

import { useLayoutEffect, useState } from 'react'
import { Table, Pagination, Select } from '@mantine/core'
import { Plus, Upload, FileSpreadsheet, RotateCw, Menu, EllipsisVertical } from 'lucide-react'
import { AddCustomerModal } from '@component/Modal/add-new-consumer.tsx';
import { getConsumerList } from '@api/consumer.ts';
import { cn } from '@lib/tailwind-merge.ts';
import { ConsumerAttributes } from '@schema/consumer-schema.ts';
import EmployeeForm from '@component/Modal/add-new-membership.tsx';
import { getMembershipList } from '@api/membership.ts';
import { PayloadMembershipSchema } from '@schema/membership-schema.ts';
import Image from 'next/image';
import { Typography } from '@component/Typography';
import dayjs from 'dayjs';
import { useAuth } from '@hook/auth';

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

export default function MembershipDashboard({branchId}: {branchId: string}) {
	const { isAuthenticated } = useAuth();
	const [activePage, setActivePage] = useState(1);
	const [itemsPerPage, setItemsPerPage] = useState('20');
	const [memberships, setMemberships] = useState<PayloadMembershipSchema[]>([]);
	useLayoutEffect(() => {
		if (branchId) {
			getMembershipList({search: '', orderBy: 'createdAt:ASC', limit: 20, page: 1}, branchId).then(consumerList => {
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
				setMemberships(consumerList);
			})
		}
	}, [branchId]);

	if (!isAuthenticated) {
		return <></>;
	}

	return (
		<div className="w-full p-4">
			{/* Header */}
			<div className="flex justify-between items-center mb-6">
				<div className="flex items-center gap-4">
					<h1 className="text-xl font-medium">Danh sách nhân viên</h1>
					<button className="lg:hidden">
						<Menu className="w-6 h-6" />
					</button>
				</div>
				<div className="flex gap-2">
					<EmployeeForm>
						<button className="flex items-center gap-2 bg-teal-500 text-white px-3 py-2 rounded-md hover:bg-teal-600">
							<Plus className="w-4 h-4" />
							<span>Thêm mới</span>
						</button>
					</EmployeeForm>

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
							<Table.Th className="whitespace-nowrap">Tên nhân viên</Table.Th>
							<Table.Th className="whitespace-nowrap">Tài khoản</Table.Th>
							<Table.Th className="whitespace-nowrap">Số điện thoại</Table.Th>
							<Table.Th className="whitespace-nowrap">Email</Table.Th>
							<Table.Th className="whitespace-nowrap">Tổng doanh số</Table.Th>
							<Table.Th className="whitespace-nowrap">Trạng thái</Table.Th>
							<Table.Th className="whitespace-nowrap">Ngày tuyển dụng</Table.Th>
							<Table.Th className="whitespace-nowrap">Chỉnh sửa</Table.Th>
						</Table.Tr>
					</Table.Thead>
					<Table.Tbody>
						{memberships.length === 0 ? (
							<Table.Tr>
								<Table.Td colSpan={7} className="text-center py-4">
									Không có dữ liệu
								</Table.Td>
							</Table.Tr>
						) : (
							memberships.map((membership, index) => (
								<Table.Tr key={membership.id} h={70}>
									<Table.Td>
										<div className={'min-w-[60px]'}>
											<Image
												alt={membership.username}
												src={membership.avatar || '/images/placeholder.png'}
												width={100}
												height={100}
												unoptimized
												className={'w-12 object-cover'} />
										</div>
									</Table.Td>
									<Table.Td className={'font-medium whitespace-nowrap'}>{membership.last_name + ' ' + membership.first_name}</Table.Td>
									<Table.Td className={'font-medium whitespace-nowrap'}>{membership.username}</Table.Td>
									<Table.Td className={'font-medium whitespace-nowrap'}>{membership.phone_number}</Table.Td>
									<Table.Td className={'font-medium whitespace-nowrap'}>{membership.email}</Table.Td>
									<Table.Td className={cn(`whitespace-nowrap font-semibold ${Number('10000') > 0 ? 'text-green-600' : 'text-zinc-700'}`)}>
										{Number(10000).toLocaleString('vi-VN')} ₫</Table.Td>
									<Table.Td>
										<div className={cn('w-fit rounded-md flex justify-center items-center', {
											'text-green-600 bg-green-500/20': membership.employee_status === 'active',
											'text-red-400 bg-red-400/20': membership.employee_status === 'inactive',
										})}>
											<span className={'whitespace-nowrap px-2'}>
												{membership.employee_status === 'active' ? 'Hoạt động' : 'Ngưng hoạt động'}
											</span>
										</div>
									</Table.Td>
									<Table.Td className={'font-medium'}>{dayjs(membership.hire_date).format('DD/MM/YYYY')}</Table.Td>
									{/*<Table.Td className={cn(`font-semibold ${Number(consumer.debit) > 0 ? 'text-red-400' : 'text-zinc-700'}`)}>*/}
									{/*	{Number(consumer.debit).toLocaleString('vi-VN')} ₫</Table.Td>*/}
									{/*<Table.Td>{consumer.gender}</Table.Td>*/}
									{/*<Table.Td>{consumer.address}</Table.Td>*/}
									<Table.Td>
										<EmployeeForm data={membership}>
											{/*<span >*/}
											<EllipsisVertical size={20}/>
											{/*</span>*/}
										</EmployeeForm>
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
					total={10}
					siblings={1}
					boundaries={1}
				/>
			</div>
		</div>
	)
}

