import React, { useCallback, useEffect, useState } from 'react';
import { MoneyInput } from '@component/money-input.tsx';
import { Divider, FileInput, NumberInput, ScrollArea, Table, Textarea, Image, Switch, Checkbox, Select, Combobox, useCombobox, Button, Group } from '@mantine/core';
import { ChevronDown, FileText, Phone, Plus, Search, X } from 'lucide-react';
import { useUID } from '@hook/common/useUID.ts';
import { invoiceActionAtom, invoiceActiveTabActionAtom, prescriptionSaleAtom } from '@store/state/overview/invoice.ts';
import { useAtom, useAtomValue } from 'jotai';
import { SearchProductType } from '@schema/autocomplete.ts';
import { InvoiceType } from '@schema/invoice-schema.ts';
import { AddCustomerModal } from '@component/Modal/add-new-consumer.tsx';
import { readNumber } from '@util/number.ts';
import ConsumerAutocomplete from '@component/Autocomplete/consumer-autocomplete.tsx';
import { useReactToPrint } from 'react-to-print';
import { useDashboard } from '@hook/dashboard/use-dasboard.ts';
import { currentBranchAtom } from '@store/state/overview/branch.ts';
import { useAuth } from '@hook/auth';
import { useDebounce } from '@uidotdev/usehooks';
import { ConsumerSearchModal } from '@component/Modal/consumer-search-modal.tsx';
import { submitInvoice } from '@api/invoice.ts';
import useToast from '@hook/client/use-toast-notification.ts';
import { Typography } from '@component/Typography';
import { DateInput, DateTimePicker } from '@mantine/dates';
import { useRewardPoint } from '@hook/dashboard/sale/use-reward-point';
import { getConsumerRewardPoint } from '@api/consumer.ts';
import { CurrentRewardPointSchema } from '@schema/reward-point-schema.ts';

type InvoiceItemProps = {
	product: InvoiceType['items'][number];
	updateItemState: (id: string, item: Partial<InvoiceType['items'][number]>) => void;
	removeItem: (id: string) => void;
	index: number;
}

function InvoiceItem({product, updateItemState, removeItem, index}: InvoiceItemProps) {
	const [notes, setNotes] = useState<string>(product.note || '');
	const [selectedUnit, setSelectedUnit] = useState<string>(product.unit || 'vien');
	const combobox = useCombobox({
		onDropdownClose: () => combobox.resetSelectedOption(),
	});

	const unitOptions = [
		{ value: 'lo', label: 'Lọ' },
		{ value: 'vien', label: 'Viên' },
		{ value: 'vi', label: 'Vỉ' },
		{ value: 'goi', label: 'Gói' },
		{ value: 'chai', label: 'Chai' },
		{ value: 'hop', label: 'Hộp' },
		{ value: 'thung', label: 'Thùng' },
		{ value: 'cai', label: 'Cái' },
	]

	return (
		<Table.Tr
			// key={`tr-${generateUID()}`}
			className="border-b">
			<Table.Td className="p-2">{index + 1}</Table.Td>
			<Table.Td className="p-2">{product.productName}</Table.Td>
			<Table.Td className="p-2">
				{/*<Select*/}
				{/*	data={[*/}
				{/*		{ value: 'lo', label: 'Lọ' },*/}
				{/*		{ value: 'vien', label: 'Viên' },*/}
				{/*		{ value: 'vi', label: 'Vỉ' },*/}
				{/*		{ value: 'goi', label: 'Gói' },*/}
				{/*		{ value: 'chai', label: 'Chai' },*/}
				{/*		{ value: 'hop', label: 'Hộp' },*/}
				{/*		{ value: 'thung', label: 'Thùng' },*/}
				{/*		{ value: 'cai', label: 'Cái' },*/}
				{/*	]}*/}
				{/*	defaultValue={product.unit || "vien"}*/}
				{/*	onChange={(value) => {*/}
				{/*		if (!value) {*/}
				{/*			return;*/}
				{/*		}*/}
				{/*		updateItemState(product.id || '', { unit: value });*/}
				{/*	}}*/}
				{/*	className={"w-[50px]"}*/}
				{/*	rightSection={<></>}*/}
				{/*/>*/}
				<Combobox
					store={combobox}
					width={250}
					position="bottom-start"
					withArrow
					onOptionSubmit={(val) => {
						setSelectedUnit(val || 'vien');
						updateItemState(product.id || '', { unit: val || 'vien' });
						combobox.closeDropdown();
					}}
				>
					<Combobox.Target>
						<Button color={"teal"} variant={"transparent"} onClick={() => combobox.toggleDropdown()}>{
							unitOptions.find((item) => item.value === selectedUnit)?.label || 'Viên'
						}</Button>
					</Combobox.Target>

					<Combobox.Dropdown>
						<Combobox.Options>
							{unitOptions.map((item) => (
								<Combobox.Option value={item.value} key={`${item.value}-${item.label}`}>
									{item.label}
								</Combobox.Option>
							))}
						</Combobox.Options>
					</Combobox.Dropdown>
				</Combobox>
				{/*{product.unit}*/}
			</Table.Td>
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
				<Textarea
					p={5}
					value={notes}
					onChange={(e) => {
						setNotes(e.currentTarget.value);
					}}
					onBlur={(e) => {
						console.log('note', e.target.value);
						updateItemState(product.id || '', { note: notes });
						// setNotes(e.target.value);
					}}
				/>
			</Table.Td>
			<Table.Td className="p-2">
				<button onClick={() => removeItem(product.id || '')}
								className="rounded-md text-red-500 hover:text-red-700 p-2 hover:bg-red-500/20 transition-colors">
					<X className="h-4 w-4" />
				</button>
			</Table.Td>
		</Table.Tr>
	)
}

function InvoiceTab() {
	const {generateUID} = useUID();
	const {branchId} = useDashboard()
	const {userSessionInfo} = useAuth();
	const {
		calculateRewardPoint,
		currentRewardPoint,
		setCurrentRewardPoint,
		setRewardPoint
	} = useRewardPoint();

	const {showErrorToast} = useToast();


	// const [consumerPayment, setConsumerPayment] = useState<number>(0);
	const [branchDetail] = useAtom(currentBranchAtom);
	const prescriptionSale = useAtomValue(prescriptionSaleAtom)

	const [invoices, invoiceDispatch] = useAtom(invoiceActionAtom);
	const [activeTab, activeTabDispatch] = useAtom(invoiceActiveTabActionAtom);

	const [autoprint, setAutoprint] = useState(false)
	const [selectedDate, setSelectedDate] = useState<Date | null>(null);

	const [vat, setVat] = useState<number>(0);

	const [totalPrice, setTotalPrice] = useState<number>(0);
	const [amountDue, setAmountDue] = useState<number>(0);
	const [discount, setDiscountState] = useState<number>(0);
	const [otherCharges, setOtherCharges] = useState<InvoiceType['otherCharges']>([]);
	const [debited, setDebited] = useState<number>(0);
	const [customer, setCustomer] = useState<{name:string, id:string}>({name: '', id: ''});
	const [qrURL, setQrURL] = useState<string | null>(null);
	const [notes, setNotes] = useState<string>('');

	const notesDebounce = useDebounce(notes, 500);

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

	const handleSubmit = async () => {
		const submit = await submitInvoice(invoices[activeTab]);
		console.log('submit', submit);
		if (!submit) {
			showErrorToast('Thanh toán thất bại');
			return;
		}
		reactToPrintFn();
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

	useEffect(() => {
		invoiceDispatch({
			type: 'update',
			id: activeTab || '',
			invoice: {
				branchId: branchId,
				user: {
					type: userSessionInfo?.role || 'user',
					id: userSessionInfo?.id || ''
				}
			}
		});
	}, [branchId, userSessionInfo]);

	useEffect(() => {
		invoiceDispatch({
			type: 'update',
			id: activeTab || '',
			invoice: {
				notes: notesDebounce
			}
		})
	}, [notesDebounce]);

	useEffect(() => {
		if (selectedDate) {
			invoiceDispatch({
				type: 'update',
				id: activeTab || '',
				invoice: {
					saleDate: selectedDate,
					saleTime: selectedDate.getTime().toString()
				}
			})
		}
	}, [selectedDate]);

	useEffect(() => {
		const vatPrice = (totalPrice * vat) / 100;
		const total = totalPrice + vatPrice;
		// setTotalPrice(total);
		setAmountDue(total);
	}, [vat]);

	useEffect(() => {
		setSelectedDate(new Date());
	}, []);

	useEffect(() => {
		console.log('customer', invoices[activeTab]?.invoiceData?.customerId);
		if (invoices[activeTab]?.invoiceData?.customerId && branchId && branchDetail) {
			void getConsumerRewardPoint(branchId ,invoices[activeTab]?.invoiceData?.customerId).then(rewardPoint => {
				if (rewardPoint) {
					const currentReward: CurrentRewardPointSchema = {
						point_to_convert: 0,
						point_remain: rewardPoint.totalPoints,
						username: userSessionInfo?.username || '',
						userId: userSessionInfo?.id || '',
					}
					setCurrentRewardPoint(currentReward);
				}
			});
		}
	}, [invoices[activeTab]?.invoiceData?.customerId, branchId, branchDetail]);

	useEffect(() => {
		if (branchDetail) {
			if (branchDetail.store.store_reward_point) {
				setRewardPoint({
					point: 1,
					description: '1 điểm',
					convert_rate: branchDetail.store.store_reward_point?.convert_rate || 1000,
					convert_to: branchDetail.store.store_reward_point?.convert_to || 'vnd',
					point_value: branchDetail.store.store_reward_point?.point_value || 1000,
				})
			}
		}
	}, [branchDetail])

	return (
		<>
			<ScrollArea pos={'relative'} id={'table'} className="flex flex-grow h-full overflow-hidden ">
				{/* Main content area */}
				<div className="w-full overflow-y-auto h-full">
						<div className="hidden">
							<div ref={componentRef}
									 className="flex flex-col justify-start items-center p-5 w-full max-w-[21cm] mx-auto bg-white">
								{/* Header */}
								<div className="text-center mb-6 w-full">
									<h1 className="text-xl font-bold">{branchDetail?.branch_name}</h1>
									<div className={'w-full'}>
										<span className={'whitespace-nowrap inline'}>
											<p className="text-md whitespace-nowrap">Địa chỉ: {branchDetail?.address}</p>
										</span>
										<span className={'whitespace-nowrap'}>
											<p className="text-md whitespace-nowrap">SĐT:{branchDetail?.phone_number}</p>
										</span>
									</div>
									<h2 className="text-3xl font-bold mt-4">HÓA ĐƠN BÁN HÀNG</h2>
									<p className="text-xl"><span className={'font-medium'}>Số HĐ:</span> {invoices[activeTab].id}</p>
									<p className="text-xl"><span className={'font-medium'}>Ngày:</span> {new Date().toLocaleString()}</p>
								</div>

								{/* Customer Info */}
								<div className="mb-6 w-full text-left text-lg">
									<div className={'w-full flex justify-between item-center'}>
										<p>
											<span className="font-semibold">Khách hàng: </span>
											{invoices[activeTab].invoiceData.customerName || customer.name}
										</p>
										<p>
											<span className="font-semibold">Nhân viên bán hàng: </span>
											{userSessionInfo?.username}
										</p>
									</div>
									{prescriptionSale ? (
										<p>
											<span className="font-semibold">Bác sĩ: </span>
											{prescriptionSale.doctor}
										</p>
									) : null}
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
								<div className={"w-full flex flex-col justify-start item-start gap-2 text-xl my-4"}>
									<div>
										<p className={"font-semibold"}>Ghi chú:</p>
										<p className={"text-lg"}>{invoices[activeTab].invoiceData.notes}</p>
									</div>
								</div>
								<div className={'w-full flex justify-start item-start gap-2 text-2xl my-4'}>
									<p className={'font-bold'}>Tổng tiền:</p>
									<p className={'font-bold'}>
										{totalPrice.toLocaleString()}đ

									</p>
								</div>
								<div className={'w-full flex justify-start item-start gap-2 text-xl'}>
									<p className={'font-bold'}>Viết bằng chữ:</p>
									<p className={'font-normal'}>
										{readNumber(totalPrice.toString())}
									</p>
								</div>
								<div className={'w-full flex flex-col gap-5 item-start text-xl mt-10'}>
									<p>Thông tin liên hệ (zalo):</p>
									<div className={"p-5 border-2"}>
										<Image src={qrURL} />
									</div>
								</div>
							</div>
						</div>
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
									<InvoiceItem
										key={product.id}
										product={product}
										index={index}
										updateItemState={updateItemState}
										removeItem={removeItem}
									/>
								))}
							</Table.Tbody>
						</Table>
					</div>
				</div>
			</ScrollArea>
			<Divider size="xs" orientation="vertical" />
			<ScrollArea id={'toolbox'} className="max-w-md w-full h-full bg-white p-4">
				<div className="space-y-4 w-full">
					{/*<div className="flex justify-between items-center">*/}
					{/*	<input*/}
					{/*		type="text"*/}
					{/*		placeholder="ntphuchungduong"*/}
					{/*		className="flex-1 p-2 border rounded"*/}
					{/*	/>*/}
					{/*	<input*/}
					{/*		type="date"*/}
					{/*		value={selectedDate?.toISOString().split('T')[0]}*/}
					{/*		onChange={(e) => setSelectedDate(new Date(e.target.value))}*/}
					{/*		className="w-32 p-2 border rounded"*/}
					{/*	/>*/}
					{/*	<span>12:55 CH</span>*/}
					{/*</div>*/}
					<div className="flex justify-between items-center">
						{/*	<input*/}
						{/*		type="text"*/}
						{/*		placeholder="ntphuchungduong"*/}
						{/*		className="flex-1 p-2 border rounded"*/}
						{/*	/>*/}
						<Typography weight={"semibold"}>Ngày bán hàng</Typography>
						<DateTimePicker
							value={selectedDate}
							onChange={(e) => setSelectedDate(e)}
							valueFormat={"DD/MM/YYYY HH:mm"}
							locale={"vi"}
							className="w-40"
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
						{/*<ConsumerAutocomplete setValue={({name, id}) => {*/}
						{/*	// setCustomer({name, id});*/}
						{/*	invoiceDispatch({*/}
						{/*		type: 'update',*/}
						{/*		id: activeTab || '',*/}
						{/*		invoice: {*/}
						{/*			customerName: name,*/}
						{/*		}*/}
						{/*	})*/}
						{/*}} />*/}
						<ConsumerSearchModal setSelectedConsumer={({ name, id }) => {
							invoiceDispatch({
								type: 'update',
								id: activeTab || '',
								invoice: {
									customerName: name,
									customerId: id
								}
							})
						}} />
						<AddCustomerModal>
							<button
								className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600">
								<Plus className="h-5 w-5" />
							</button>
						</AddCustomerModal>
					</div>

					{/*<button*/}
					{/*	className="w-full px-4 py-2 bg-gray-100 text-gray-700 rounded flex justify-between items-center">*/}
					{/*	Bảng giá chung*/}
					{/*	<ChevronDown className="h-5 w-5" />*/}
					{/*</button>*/}

					<Group wrap={"nowrap"} justify={"space-between"}>
						<label className="flex items-center space-x-2">
							<Checkbox
								defaultChecked
								color={"teal"}
								// label="I agree to sell my privacy"
							/>
							<Typography className={"select-none"} weight={'semibold'}>Tích điểm</Typography>
						</label>
						{currentRewardPoint ? (
							<div className="flex justify-between items-center gap-2">
								<Typography weight={'semibold'}>Số điểm</Typography>
								<span className="text-lg bg-zinc-100 text-blue-800 px-2 py-1 rounded">
								{currentRewardPoint.point_remain}
							</span>
							</div>
						) : null}
					</Group>

					<div className="space-y-2">
						<div className="flex justify-between items-center">
							<Typography weight={'semibold'}>Tổng tiền hàng</Typography>
							<span className="text-lg bg-blue-100 text-blue-800 px-2 py-1 rounded">
								{totalPrice.toLocaleString()}đ
							</span>
						</div>
						<div className="flex justify-between items-center">
							<Typography weight={'semibold'}>Đổi điểm</Typography>
							<div className="flex items-center gap-2">
								<NumberInput
									// value={currentRewardPoint?.point_to_convert || 0}
									allowNegative={false}
									onChange={(value) => {
										// setDiscount(value);
										if (currentRewardPoint) {
											const parsedValue = Number(value);
											const rewardPoint = calculateRewardPoint(parsedValue);
											setDiscount(rewardPoint);
										}
									}}
									className={'w-[120px]'}
								/>
							</div>
						</div>
						<div className="flex justify-between items-center">
							<Typography weight={'semibold'}>VAT</Typography>
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
							<Typography weight={'semibold'}>Thu khác</Typography>
							<span className="bg-gray-100 text-gray-800 px-2 py-1 rounded">0</span>
						</div>
					</div>

					<div className="space-y-2">
						<div className="flex justify-between items-center text-green-600">
							<Typography color={"primary"} weight={'semibold'}>Khách cần trả</Typography>
							<span className="text-2xl font-bold text-emerald-600 px-2 py-1 rounded">
								{amountDue.toLocaleString()}đ
							</span>
						</div>
						<div className="flex justify-between items-center">
							<Typography weight={'semibold'}>Khách thanh toán (F2)</Typography>
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
							<Typography weight={'semibold'}>{debited < 0 ? 'Nợ' : 'Tiền thừa trả khách'}</Typography>
							<span className="text-lg font-medium text-zinc-700 px-2 py-1 rounded">
								{Math.abs(debited).toLocaleString()}đ
							</span>
						</div>
					</div>

					<textarea
						placeholder="Ghi chú"
						className="w-full p-2 border rounded resize-none"
						rows={2}
						onChange={(e) => {
							setNotes(e.target.value);
						}}
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
						</label>
					</div>

					{/*<div className={''}>*/}
					{/*	<FileInput*/}
					{/*		onChange={(file) => {*/}
					{/*			const reader = new FileReader();*/}
					{/*			reader.onload = (e) => {*/}
					{/*				// qrURLRef.current = e.target?.result as string;*/}
					{/*				setQrURL(e.target?.result as string);*/}
					{/*			}*/}
					{/*			if (file) reader.readAsDataURL(file);*/}
					{/*		}}*/}
					{/*		description={'Chọn file qr'}*/}
					{/*	/>*/}
					{/*</div>*/}
					<button onClick={() => handleSubmit()}
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

export default InvoiceTab;