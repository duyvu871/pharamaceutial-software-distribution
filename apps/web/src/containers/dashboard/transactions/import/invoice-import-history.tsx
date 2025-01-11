'use client'

import { useEffect, useState } from 'react'
import { Table, Pagination, Select, TextInput, ScrollArea, Group, Box } from '@mantine/core'
import { Plus, Upload, FileSpreadsheet, RotateCw, Menu, Search } from 'lucide-react'
import { cn } from '@lib/tailwind-merge.ts'
import { getInvoiceList, InvoiceResponse } from '@api/invoice.ts';
// import { Invoice, InvoiceRender } from '@schema/invoice-schema.ts'
import { CenterBox } from '@component/CenterBox'
import InvoiceDetail from '@component/Invoice/invoice-detail.tsx';
import { Typography } from '@component/Typography';
import { useAuth } from '@hook/auth'
import { getImportProductList, ResponseImportProductList } from '@api/import.ts';
import ImportInvoiceDetail from '@component/Invoice/Import-invoice-detail.tsx';
// import InvoiceDetail from '@component/invoice/invoice-detail.tsx'


export type InvoiceRender = {
	id: string
	saleDate: string
	customerName: string
	totalPrice: number
	amountPaid: number
	debit: number
	status: string
	statusLabel: string
}

export default function ImportHistory({branchId}: {branchId: string}) {
	const { isAuthenticated, userSessionInfo } = useAuth();
	const [activePage, setActivePage] = useState(1)
	const [itemsPerPage, setItemsPerPage] = useState('20')
	const [selectedItems, setSelectedItems] = useState<string[]>([])
	const [invoicesImport, setInvoicesImport] = useState<ResponseImportProductList['data']>([])
	const [invoiceDetailActive, setInvoiceDetailActive] = useState<string | null>(null)

	const toggleSelectAll = () => {
		if (selectedItems.length === invoicesImport.length) {
			setSelectedItems([])
		} else {
			setSelectedItems(invoicesImport.map(i => i.id))
		}
	}

	const toggleSelectItem = (id: string) => {
		if (selectedItems.includes(id)) {
			setSelectedItems(selectedItems.filter(item => item !== id))
		} else {
			setSelectedItems([...selectedItems, id])
		}
	}

	const toggleDetail = (transformedInvoice: ResponseImportProductList['data'][number]) =>
		setInvoiceDetailActive(
			invoiceDetailActive === transformedInvoice.id ? null : transformedInvoice.id
		)

	const transformInvoice = (invoice: ResponseImportProductList['data'][number]) => invoice

	useEffect(() => {
		console.log("isAuthenticated", isAuthenticated);
		if (branchId) {
			getImportProductList({
				branchId,
				page: activePage,
				limit: parseInt(itemsPerPage),
			}).then((data) => {
				setInvoicesImport(data.data)
			})
		}
	}, [branchId])


	if (!isAuthenticated) {
		return <></>;
	}

	return (
		<CenterBox
			className={'flex-1 bg-zinc-100 h-full overflow-hidden'}
			classNames={{
				inner: 'flex flex-col w-full max-w-full h-full'
			}}
		>
			<Group align={'start'} className="h-full overflow-hidden !flex-nowrap" gap={0}>
				<div className="flex-1 p-4 h-full flex flex-col">
					<div className="mb-2">
						<div className="flex justify-between items-center mb-4">
							<Typography size={"h3"} weight={"bold"}>Hóa đơn nhập hàng</Typography>
							<button className="lg:hidden">
								<Menu className="w-6 h-6" />
							</button>
						</div>

						{/*<div className="flex gap-2 items-center">*/}
						{/*	<div className="flex-1">*/}
						{/*		<TextInput*/}
						{/*			placeholder="Tìm kiếm theo tên khách hàng, mã hóa đơn"*/}
						{/*			leftSection={<Search className="w-4 h-4" />}*/}
						{/*			className="max-w-xl"*/}
						{/*		/>*/}
						{/*	</div>*/}
						{/*	<button className="flex items-center gap-2 bg-teal-500 text-white px-3 py-2 rounded-md hover:bg-purple-600">*/}
						{/*		<Upload className="w-4 h-4" />*/}
						{/*		<span>Tải lên</span>*/}
						{/*	</button>*/}
						{/*	<button className="flex items-center gap-2 bg-teal-500 text-white px-3 py-2 rounded-md hover:bg-red-600">*/}
						{/*		<FileSpreadsheet className="w-4 h-4" />*/}
						{/*		<span>Xuất Excel</span>*/}
						{/*	</button>*/}
						{/*	<InvoiceModal>*/}
						{/*		<button className="flex items-center gap-2 bg-teal-500 text-white px-3 py-2 rounded-md hover:bg-teal-600">*/}
						{/*			<Plus className="w-4 h-4" />*/}
						{/*			<span>Thêm mới</span>*/}
						{/*		</button>*/}
						{/*	</InvoiceModal>*/}
						{/*	<button className="flex items-center gap-2 bg-teal-500 text-white px-3 py-2 rounded-md hover:bg-teal-600">*/}
						{/*		<RotateCw className="w-4 h-4" />*/}
						{/*		<span>Làm mới</span>*/}
						{/*	</button>*/}
						{/*</div>*/}
					</div>

					<div className="bg-white rounded-md shadow overflow-y-auto">
						<ScrollArea scrollbars={"xy"} pos={'relative'} id={'table'} className="flex flex-grow">
							<Table striped highlightOnHover>
								<Table.Thead role={'rowgroup'}>
									<Table.Tr>
										<Table.Th className="w-12">
											<input
												type="checkbox"
												className="rounded border-gray-300"
												checked={selectedItems.length === invoicesImport.length}
												onChange={toggleSelectAll}
											/>
										</Table.Th>
										<Table.Th className="whitespace-nowrap">#</Table.Th>
										<Table.Th className="whitespace-nowrap">Ngày bán</Table.Th>
										<Table.Th className="whitespace-nowrap">Tên khách hàng</Table.Th>
										<Table.Th className="whitespace-nowrap">VAT</Table.Th>
										<Table.Th className="whitespace-nowrap">Cần thanh toán</Table.Th>
										<Table.Th className="whitespace-nowrap">Tổng tiền</Table.Th>
										<Table.Th className="whitespace-nowrap">Đã thanh toán</Table.Th>
										<Table.Th className="whitespace-nowrap">Còn nợ</Table.Th>
										<Table.Th className="whitespace-nowrap">Trạng thái</Table.Th>
									</Table.Tr>
								</Table.Thead>
								<Table.Tbody role={'rowgroup'}>
									{invoicesImport.map((invoice, index) => {
										const transformedInvoice = transformInvoice(invoice)
										return (
											<>
												<Table.Tr key={invoice.id} h={50}>
													<Table.Td>
														<input
															type="checkbox"
															className="rounded border-gray-300"
															checked={selectedItems.includes(transformedInvoice.id)}
															onChange={() => toggleSelectItem(transformedInvoice.id)}
														/>
													</Table.Td>
													<Table.Td onClick={() => toggleDetail(transformedInvoice)}>{index + 1}</Table.Td>
													<Table.Td onClick={() => toggleDetail(transformedInvoice)} className={'whitespace-nowrap'}>
														{transformedInvoice.createdAt}
													</Table.Td>
													<Table.Td onClick={() => toggleDetail(transformedInvoice)} className="max-w-md truncate">
														{transformedInvoice.provider?.companyName || 'Không có'}
													</Table.Td>
													<Table.Td onClick={() => toggleDetail(transformedInvoice)} className={'whitespace-nowrap'}>
														{transformedInvoice.vat}
													</Table.Td>
													<Table.Td onClick={() => toggleDetail(transformedInvoice)} className={'whitespace-nowrap'}>
														{transformedInvoice.amount_due.toLocaleString('vi-VN')}
													</Table.Td>
													<Table.Td onClick={() => toggleDetail(transformedInvoice)} className={'whitespace-nowrap'}>
														{transformedInvoice.total_amount.toLocaleString('vi-VN')}
													</Table.Td>
													<Table.Td onClick={() => toggleDetail(transformedInvoice)} className={'whitespace-nowrap'}>
														{transformedInvoice.amount_paid.toLocaleString('vi-VN')}
													</Table.Td>
													<Table.Td onClick={() => toggleDetail(transformedInvoice)} className={'whitespace-nowrap'}>
														{Math.abs(transformedInvoice.debit).toLocaleString('vi-VN')}
													</Table.Td>
													<Table.Td onClick={() => toggleDetail(transformedInvoice)}>
                            <span className={cn(
															'px-2 whitespace-nowrap py-1 rounded-md text-sm',
															transformedInvoice.status === 1
																? 'bg-teal-500/10 text-teal-500'
																: 'bg-yellow-500/10 text-yellow-500'
														)}>
                              {transformedInvoice.status === 1 ? 'Hoàn thành' : 'Chưa hoàn thành'}
                            </span>
													</Table.Td>
												</Table.Tr>
												<Table.Tr key={invoice.id + '-detail'} className={'overflow-hidden'}>
													<Table.Td p={0} colSpan={10}>
														<Box h={invoiceDetailActive === transformedInvoice.id ? '' : 0} className={'transition-all overflow-hidden'}>
															<ImportInvoiceDetail invoice={invoice} />
														</Box>
													</Table.Td>
												</Table.Tr>
											</>
										)
									})}
								</Table.Tbody>
							</Table>
						</ScrollArea>
					</div>

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
                {invoicesImport.length} of {invoicesImport.length}
              </span>
						</div>
						<Pagination
							value={activePage}
							onChange={setActivePage}
							total={Math.ceil(invoicesImport.length / parseInt(itemsPerPage))}
							siblings={1}
							boundaries={1}
							color={'rgb(20 184 166)'}
						/>
					</div>
				</div>
			</Group>
		</CenterBox>
	)
}

