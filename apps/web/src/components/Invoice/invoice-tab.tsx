import React, { useCallback, useEffect, useState } from 'react';
import { MoneyInput } from '@component/money-input.tsx';
import { Divider, NumberInput, ScrollArea, Table, Textarea } from '@mantine/core';
import { ChevronDown, FileText, Phone, Plus, Search, X } from 'lucide-react';
import { useUID } from '@hook/common/useUID.ts';
import { invoiceActionAtom, invoiceActiveTabActionAtom } from '@store/state/overview/invoice.ts';
import { useAtom } from 'jotai';
import { SearchProductType } from '@schema/autocomplete.ts';
import { InvoiceType } from '@schema/invoice-schema.ts';
import { AddCustomerModal } from '@component/Modal/add-new-user.tsx';
import { readNumber } from '@util/number.ts';

function InvoiceTab() {
	const {generateUID} = useUID();
	const [autoprint, setAutoprint] = useState(false)
	const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());
	// const [consumerPayment, setConsumerPayment] = useState<number>(0);

	const [invoices, invoiceDispatch] = useAtom(invoiceActionAtom);
	const [activeTab, activeTabDispatch] = useAtom(invoiceActiveTabActionAtom);

	const [totalPrice, setTotalPrice] = useState<number>(0);
	const [amountDue, setAmountDue] = useState<number>(0);
	const [discount, setDiscountState] = useState<number>(0);
	const [otherCharges, setOtherCharges] = useState<InvoiceType['otherCharges']>([]);
	const [debited, setDebited] = useState<number>(0);


	const cartItems = activeTab
		? invoices[activeTab]?.invoiceData?.items
			? invoices[activeTab]?.invoiceData?.items
			: []
		: [];

	const updateItemState = (id: string, item: Partial<InvoiceType['items'][number]>) => {
		if (!activeTab) {
			return;
		}

		invoiceDispatch({
			type: 'update-item',
			id: activeTab,
			itemId: id,
			item: { ...item },
		});
	}

	const updatePrice = (id: string, price: number) => {
		if (!activeTab) {
			return;
		}
		console.log('update price', id, price);
		invoiceDispatch({
			type: 'update-item',
			id: activeTab,
			itemId: id,
			item: { price },
		});
	}

	const removeItem = (id: string) => {
		console.log('remove item', id);
		if (!activeTab) {
			return;
		}
		invoiceDispatch({
			type: 'remove-item',
			id: activeTab,
			itemId: id,
		});

	}

	const setDebit = (value: number) => {
		if (!activeTab) {
			return;
		}
		invoiceDispatch({
			type: 'update',
			id: activeTab,
			invoice: {
				debit: value
			}
		})
	}

	const setDiscount = (value: number) => {
		if (!activeTab) {
			return;
		}
		invoiceDispatch({
			type: 'update',
			id: activeTab,
			invoice: {
				discount: value
			}
		});
	}

	useEffect(() => {
		const total = invoices[activeTab]?.invoiceData?.totalPrice || 0;
		const discount = invoices[activeTab]?.invoiceData?.discount || 0;
		const amountDue = invoices[activeTab]?.invoiceData?.amountDue || 0;
		const debited = invoices[activeTab]?.invoiceData?.debit || 0;
		const otherCharges = invoices[activeTab]?.invoiceData?.otherCharges || 0;

		setTotalPrice(total);
		setDiscountState(discount);
		setAmountDue(amountDue);
		setDebited(debited);
		setOtherCharges(otherCharges);
	}, [invoices, activeTab]);

	return (
		<>
			<ScrollArea pos={'relative'} id={'table'} className="flex flex-grow h-full overflow-hidden ">
				{/* Main content area */}
				<div className="w-full overflow-y-auto h-full">
					<div className="w-full overflow-y-auto overflow-x-auto h-full p-4 bg-white rounded-md shadow">
						<Table withTableBorder stickyHeader striped highlightOnHover verticalSpacing="md">
							<Table.Thead>
								<Table.Tr>
									<Table.Th>STT</Table.Th>
									<Table.Th>Tên sản phẩm</Table.Th>
									<Table.Th>Số lượng</Table.Th>
									<Table.Th>Đơn giá</Table.Th>
									<Table.Th>Thành tiền</Table.Th>
									<Table.Th>Ghi Chú/Liều dùng</Table.Th>
								</Table.Tr>
							</Table.Thead>
							<Table.Tbody>
								{cartItems.map((product, index) => (
									<Table.Tr key={`tr-${generateUID()}`} className="border-b">
										<Table.Td className="p-2">{index + 1}</Table.Td>
										<Table.Td className="p-2">{product.productName}</Table.Td>
										<Table.Td className="p-2">
											<NumberInput className={'!w-16'} value={product.quantity} onChange={(quantity) => {
												updateItemState(product.id || '', {
													quantity: Number(quantity) || 1
												});
											}} />
										</Table.Td>
										<Table.Td className="p-2">
											<MoneyInput
												value={product.price}
												onChange={(value) => {
													console.log('value', value);
													updateItemState(product.id || '', { price: value })
												}}
												className={'w-[120px]'}
											/>
											{/*{product.price.toLocaleString()}đ*/}
										</Table.Td>
										<Table.Td className="p-2">{product.total.toLocaleString()}đ</Table.Td>
										<Table.Td className="p-2">
											<Textarea />
										</Table.Td>
										<Table.Td className="p-2">
											<button onClick={() => removeItem(product.id || '')} className="rounded-md text-red-500 hover:text-red-700 p-2 hover:bg-red-500/20 transition-colors">
												<X className="h-4 w-4" />
											</button>
										</Table.Td>
									</Table.Tr>
								))}
							</Table.Tbody>
						</Table>
					</div>
				</div>
			</ScrollArea>
			<Divider size="xs"  orientation="vertical"/>
			<ScrollArea  id={'toolbox'} className="max-w-md w-full h-full bg-white p-4">
				<div className="space-y-4 w-full">
					<div className="flex justify-between items-center">
						<input
							type="text"
							placeholder="ntphuchungduong"
							className="flex-1 p-2 border rounded"
						/>
						<input
							type="date"
							value={selectedDate?.toISOString().split('T')[0]}
							onChange={(e) => setSelectedDate(new Date(e.target.value))}
							className="w-32 p-2 border rounded"
						/>
						<span>12:55 CH</span>
					</div>

					<div className="relative">
						<input
							type="text"
							placeholder="Tìm khách hàng (F4)"
							className="w-full pl-10 pr-10 py-2 border rounded"
						/>
						<Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
						<AddCustomerModal>
							<button
								className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600">
								<Plus className="h-5 w-5" />
							</button>
						</AddCustomerModal>
					</div>

					<button
						className="w-full px-4 py-2 bg-gray-100 text-gray-700 rounded flex justify-between items-center">
						Bảng giá chung
						<ChevronDown className="h-5 w-5" />
					</button>

					<label className="flex items-center space-x-2">
						<input type="checkbox" className="form-checkbox" />
						<span>Bán thuốc theo đơn</span>
					</label>

					<div className="space-y-2">
						<div className="flex justify-between items-center">
							<span className="text-sm">Tổng tiền hàng</span>
							<span className="text-lg bg-blue-100 text-blue-800 px-2 py-1 rounded">
								{totalPrice.toLocaleString()}đ
							</span>
						</div>
						<div className="flex justify-between items-center">
							<span className="text-sm">Giảm giá (F6)</span>
							<div className="flex items-center gap-2">
								<MoneyInput
									value={discount}
									onChange={(value) => {
										setDiscount(value);
									}}
									className={'w-[120px]'}
								/>
							</div>
						</div>
						<div className="flex justify-between items-center">
							<span className="text-sm">Thu khác</span>
							<span className="bg-gray-100 text-gray-800 px-2 py-1 rounded">0</span>
						</div>
					</div>

					<div className="space-y-2">
						<div className="flex justify-between items-center text-green-600">
							<span>Khách cần trả</span>
							<span className="text-2xl font-bold text-emerald-600 px-2 py-1 rounded">
								{amountDue.toLocaleString()}đ
							</span>
						</div>
						<div className="flex justify-between items-center">
							<span className="text-sm">Khách thanh toán (F2)</span>
							<div className="flex items-center gap-2">
								{activeTab ? (
									<MoneyInput
										value={invoices[activeTab]?.invoiceData?.amountPaid || 0}
										onChange={(value) => {
											console.log('consumer payment', value);
											invoiceDispatch({
												type: 'update',
												id: activeTab || '',
												invoice: {
													amountPaid: value
												}
											})
											// setConsumerPayment(value);
										}}
										className={'w-[120px]'}
									/>
								) : null}
							</div>
						</div>
						<div className="flex justify-between items-center">
							<span className="text-sm">{debited < 0 ? 'Nợ' : 'Tiền thừa trả khách'}</span>
							<span className="text-lg font-medium text-zinc-700 px-2 py-1 rounded">
								{Math.abs(debited).toLocaleString()}đ
							</span>
						</div>
					</div>

					<textarea
						placeholder="Ghi chú"
						className="w-full p-2 border rounded resize-none"
						rows={3}
					></textarea>

					<div className="flex justify-between items-center">
						<span className="text-sm">Tự động in hóa đơn khi thanh toán</span>
						<label className="relative inline-flex items-center cursor-pointer">
							<input
								type="checkbox"
								className="sr-only peer"
								checked={autoprint}
								onChange={(e) => setAutoprint(e.target.checked)}
							/>
							<div
								className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
						</label>
					</div>

					<div className={''}>
						{}
					</div>
					<button className="w-full py-3 bg-green-500 text-white rounded text-lg hover:bg-green-600">
						Thanh toán (F7)
					</button>

					<div className="flex justify-center items-center gap-2 text-sm text-gray-500">
						<Phone className="h-4 w-4" />
						<span>Hỗ trợ khách hàng 0972 574 506</span>
					</div>
				</div>
			</ScrollArea>
		</>
	);
}

export default InvoiceTab;