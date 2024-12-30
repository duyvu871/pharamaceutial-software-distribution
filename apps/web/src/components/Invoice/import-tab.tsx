import React, { useCallback, useEffect, useState } from 'react';
import { MoneyInput } from '@component/money-input.tsx';
import { Divider, FileInput, NumberInput, ScrollArea, Table, Textarea, Image, Stack, Switch } from '@mantine/core';
import { ChevronDown, FileText, Phone, Plus, Search, X } from 'lucide-react';
import { useUID } from '@hook/common/useUID.ts';
import { invoiceActionAtom, invoiceActiveTabActionAtom } from '@store/state/overview/invoice.ts';
import { useAtom } from 'jotai';
import { SearchProductType } from '@schema/autocomplete.ts';
import { InvoiceType } from '@schema/invoice-schema.ts';
import { AddCustomerModal } from '@component/Modal/add-new-user.tsx';
import { readNumber } from '@util/number.ts';
import ConsumerAutocomplete from '@component/Autocomplete/consumer-autocomplete.tsx';
import { useReactToPrint } from 'react-to-print';
import { useDashboard } from '@hook/dashboard/use-dasboard.ts';
import { currentBranchAtom } from '@store/state/overview/branch.ts';
import { useAuth } from '@hook/auth';
import ProductFormV3 from '@component/Form/product-form-v3.tsx';
import { Resizable } from '@component/Resizeable/base.tsx';
import ProviderAutocomplete from '@component/Autocomplete/provider-autocomplete.tsx';
import { Typography } from '@component/Typography';
import { DateInput } from '@mantine/dates';

function ImportTab() {
	const {generateUID} = useUID();
	const {} = useDashboard()
	const {userSessionInfo} = useAuth();
	const [autoprint, setAutoprint] = useState(false)
	const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());
	// const [consumerPayment, setConsumerPayment] = useState<number>(0);
	const [branchDetail] = useAtom(currentBranchAtom);

	const [invoices, invoiceDispatch] = useAtom(invoiceActionAtom);
	const [activeTab, activeTabDispatch] = useAtom(invoiceActiveTabActionAtom);

	const [vat, setVat] = useState<number>(0);
	const [totalPrice, setTotalPrice] = useState<number>(0);
	const [amountDue, setAmountDue] = useState<number>(0);
	const [discount, setDiscountState] = useState<number>(0);
	const [otherCharges, setOtherCharges] = useState<InvoiceType['otherCharges']>([]);
	const [debited, setDebited] = useState<number>(0);
	const [customer, setCustomer] = useState<{name:string, id:string}>({name: '', id: ''});
	const qrURLRef = React.useRef<string | null>(null);
	const [qrURL, setQrURL] = useState<string | null>(null);

	const componentRef = React.useRef(null);
	const reactToPrintFn = useReactToPrint({ contentRef: componentRef });

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

	// const setCustomer = (customer: {name:string, id:string}) => {
	// 	if (!activeTab) {
	// 		return;
	// 	}
	// 	invoiceDispatch({
	// 		type: 'update',
	// 		id: activeTab,
	// 		invoice: {
	// 			customerName: customer.name,
	// 		}
	// 	});
	// }

	const handleInvoiceSubmit = () => {

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

	// update price by vat change
	useEffect(() => {
		const vatPrice = (totalPrice * vat) / 100;
		const total = totalPrice + vatPrice;
		// setTotalPrice(total);
		setAmountDue(total);
	}, [vat]);

	return (
		<>
			<Stack w={"100%"}>
				{/*<Resizable className={"flex-grow"} w={"100%"} h={"600px"} direction={"vertical"}>*/}
					<ScrollArea className={'flex-grow w-full h-[600px]'}>
						<ProductFormV3 />
					</ScrollArea>
				{/*</Resizable>*/}
				<ScrollArea pos={'relative'} id={'table'} className="flex flex-grow h-full overflow-hidden">
					{/*<div className={'absolute z-[99] top-0 bg-white w-full h-[200px]'}></div>*/}
					{/* Main content area */}
					<div className="w-full h-full">
						<div className="hidden">
							<div ref={componentRef}
									 className="flex flex-col justify-start items-center gap-5 p-8 w-full max-w-[21cm] mx-auto bg-white">
								{/* Header */}
								<div className="text-center mb-6">
									<h1 className="text-3xl font-bold">{branchDetail?.branch_name}</h1>
									<p className="text-xl">{branchDetail?.address}</p>
									<h2 className="text-xl font-bold mt-4">HÓA ĐƠN BÁN HÀNG</h2>
									<p className="text-xl">Số HĐ: {invoices[activeTab].id}</p>
									<p className="text-xl">Ngày: {new Date().toLocaleString()}</p>
								</div>

								{/* Customer Info */}
								<div className="mb-6 text-xl">
									<p>
										<span className="font-semibold">Khách hàng: </span>
										{invoices[activeTab].invoiceData.customerName || customer.name}
									</p>
								</div>

								<table
									className="p-5 w-full table border-collapse border border-gray-300 [&_th,&_td]:whitespace-nowrap [&_th,&_td]:text-left">
									<thead className="border-b border-gray-300">
									<tr>
										<th>STT</th>
										<th>Tên sản phẩm</th>
										<th>Đơn vị</th>
										<th>Số lượng</th>
										<th>Đơn giá</th>
										<th>Thành tiền</th>
										<th>Ghi Chú/Liều dùng</th>
									</tr>
									</thead>
									<tbody>
									{cartItems.map((product, index) => (
										<tr key={`tr-${generateUID()}`} className="border-b">
											<td className="p-2">{index + 1}</td>
											<td className="p-2">{product.productName}</td>
											<td className="p-2">{product.unit}</td>
											<td className="p-2">
												{product.quantity}
											</td>
											<td className="p-2">
												{product.price.toLocaleString()}đ
											</td>
											<td className="p-2">{product.total.toLocaleString()}đ</td>
											<td className="p-2">
												{product.note}
											</td>
										</tr>
									))}
									</tbody>
								</table>
								<div className={'w-full flex justify-start item-start gap-2 text-2xl'}>
									<p className={'font-bold'}>Tổng cộng:</p>
									<p className={'font-bold'}>
										{totalPrice.toLocaleString()}đ
									</p>
								</div>
								<div className={'text-xl'}>
									<p>QR hỗ trợ</p>
									<Image w={200} h={200} src={qrURL} />
								</div>
							</div>
						</div>
						{/*<div className={'w-full h-[200px]'}></div>*/}
						<div className="w-full overflow-y-auto overflow-x-auto h-full p-4 bg-white rounded-md shadow">
							<Table withTableBorder stickyHeader striped highlightOnHover verticalSpacing="md">
								<Table.Thead>
									<Table.Tr>
										<Table.Th>STT</Table.Th>
										<Table.Th>Tên sản phẩm</Table.Th>
										<Table.Th>Đơn vị</Table.Th>
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
											<Table.Td className="p-2">{product.unit}</Table.Td>
											<Table.Td className="p-2">
												<NumberInput className={'!w-16'} value={product.quantity} onChange={(quantity) => {
													updateItemState(product.id || '', {
														quantity: Number(quantity) || 1,
													});
												}} />
											</Table.Td>
											<Table.Td className="p-2">
												<MoneyInput
													value={product.price}
													onChange={(value) => {
														console.log('value', value);
														updateItemState(product.id || '', { price: value });
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
												<button onClick={() => removeItem(product.id || '')}
																className="rounded-md text-red-500 hover:text-red-700 p-2 hover:bg-red-500/20 transition-colors">
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
			</Stack>
			<Divider size="xs" orientation="vertical" />
			<ScrollArea id={'toolbox'} className="max-w-md w-full h-full bg-white p-4">
				<div className="space-y-4 w-full">
					<div className="flex justify-between items-center">
					{/*	<input*/}
					{/*		type="text"*/}
					{/*		placeholder="ntphuchungduong"*/}
					{/*		className="flex-1 p-2 border rounded"*/}
					{/*	/>*/}
						<Typography weight={"semibold"}>Ngày nhập hàng</Typography>
						<DateInput
							value={selectedDate}
							onChange={(e) => setSelectedDate(e)}
							locale={"vi"}
							valueFormat={"DD/MM/YYYY"}
							className="w-32"
						/>
					{/*	<span>12:55 CH</span>*/}
					</div>

					<div className="relative">
						{/*<input*/}
						{/*	type="text"*/}
						{/*	placeholder="Tìm khách hàng (F4)"*/}
						{/*	className="w-full pl-10 pr-10 py-2 border rounded"*/}
						{/*/>*/}
						{/*<Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />*/}
						<ProviderAutocomplete setValue={({ name, id }) => {
							// console.log('set customer', name, id);
							// setCustomer({name, id});
							// invoiceDispatch({
							// 	type: 'update',
							// 	id: activeTab || '',
							// 	invoice: {
							// 		customerName: name,
							// 	}
							// })
						}} />
						{/*<AddCustomerModal>*/}
						{/*	<button*/}
						{/*		className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600">*/}
						{/*		<Plus className="h-5 w-5" />*/}
						{/*	</button>*/}
						{/*</AddCustomerModal>*/}
					</div>

					{/*<button*/}
					{/*	className="w-full px-4 py-2 bg-gray-100 text-gray-700 rounded flex justify-between items-center">*/}
					{/*	Bảng giá chung*/}
					{/*	<ChevronDown className="h-5 w-5" />*/}
					{/*</button>*/}

					{/*<label className="flex items-center space-x-2">*/}
					{/*	<input type="checkbox" className="form-checkbox" />*/}
					{/*	<span>Tích điểm</span>*/}
					{/*</label>*/}

					<div className="space-y-2">
						<div className="flex justify-between items-center">
							<Typography weight={"semibold"}>VAT</Typography>
							<span className="text-lg rounded">
								<NumberInput
									value={vat}
									allowNegative={false}
									max={100}
									onChange={(value) => {
										setVat(Number(value));
									}}
									rightSection={'%'}
									className={'w-[120px]'}
								/>
							</span>
						</div>
						<div className="flex justify-between items-center">
							<Typography weight={"semibold"}>Tổng tiền hàng</Typography>
							<span className="text-lg bg-blue-100 text-blue-800 px-2 py-1 rounded">
								{totalPrice.toLocaleString()}đ
							</span>
						</div>
						{/*<div className="flex justify-between items-center">*/}
						{/*	<span className="text-sm">Giảm giá (F6)</span>*/}
						{/*	<div className="flex items-center gap-2">*/}
						{/*		<MoneyInput*/}
						{/*			value={discount}*/}
						{/*			onChange={(value) => {*/}
						{/*				setDiscount(value);*/}
						{/*			}}*/}
						{/*			className={'w-[120px]'}*/}
						{/*		/>*/}
						{/*	</div>*/}
						{/*</div>*/}
						{/*<div className="flex justify-between items-center">*/}
						{/*	<span className="text-sm">Thu khác</span>*/}
						{/*	<span className="bg-gray-100 text-gray-800 px-2 py-1 rounded">0</span>*/}
						{/*</div>*/}
					</div>

					<div className="space-y-2">
						<div className="flex justify-between items-center text-green-600">
							<Typography color={"primary"} weight={"semibold"}>Khách cần trả</Typography>
							<span className="text-2xl font-bold text-emerald-600 px-2 py-1 rounded">
								{amountDue.toLocaleString()}đ
							</span>
						</div>
						<div className="flex justify-between items-center">
							<Typography weight={"semibold"}>Thanh toán (F2)</Typography>
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
													amountPaid: value,
												},
											});
											// setConsumerPayment(value);
										}}
										className={'w-[120px]'}
									/>
								) : null}
							</div>
						</div>
						<div className="flex justify-between items-center">
							<Typography >{debited < 0 ? 'Nợ' : 'Tiền thừa trả lại'}</Typography>
							<span className="text-lg font-medium text-zinc-700 px-2 py-1 rounded">
								{Math.abs(debited).toLocaleString()}đ
							</span>
						</div>
					</div>

					<textarea
						placeholder="Ghi chú"
						className="w-full p-2 border rounded resize-none"
						rows={2}
					></textarea>

					<div className="flex justify-between items-center">
						<span className="text-sm">Tự động in hóa đơn khi thanh toán</span>
						<label className="relative inline-flex items-center cursor-pointer">
							<Switch
								checked={autoprint}
								color={"teal"}
								size={"md"}
								onChange={(event) => setAutoprint(event.currentTarget.checked)}
							/>
							{/*<input*/}
							{/*	type="checkbox"*/}
							{/*	className="sr-only peer"*/}
							{/*	checked={autoprint}*/}
							{/*	onChange={(e) => setAutoprint(e.target.checked)}*/}
							{/*/>*/}
							{/*<div*/}
							{/*	className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>*/}
						</label>
					</div>

					<div className={''}>
						<FileInput
							onChange={(file) => {
								const reader = new FileReader();
								reader.onload = (e) => {
									// qrURLRef.current = e.target?.result as string;
									setQrURL(e.target?.result as string);
								};
								if (file) reader.readAsDataURL(file);
							}}
							description={'Chọn file qr'}
						/>
					</div>
					<button onClick={() => {
						if (autoprint) {
							handleInvoiceSubmit();
							reactToPrintFn();
						}
					}}
									className="w-full py-3 bg-teal-500 text-white rounded text-lg hover:bg-teal-600">
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

export default ImportTab;