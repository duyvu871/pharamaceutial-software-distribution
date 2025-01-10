import React, { useCallback, useEffect, useState } from 'react';
import { MoneyInput } from '@component/money-input.tsx';
import { Divider, FileInput, NumberInput, ScrollArea, Table, Textarea, Image, Stack, Switch } from '@mantine/core';
import { ChevronDown, FileText, Phone, Plus, Search, X } from 'lucide-react';
import { useUID } from '@hook/common/useUID.ts';
import { invoiceActionAtom, invoiceActiveTabActionAtom } from '@store/state/overview/invoice.ts';
import { useAtom } from 'jotai';
import { SearchProductType } from '@schema/autocomplete.ts';
import { InvoiceType } from '@schema/invoice-schema.ts';
import { AddCustomerModal } from '@component/Modal/add-new-consumer.tsx';
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
import { Label } from '@component/label';
import { ProviderModal } from '@component/Modal/provider-modal.tsx';
import { useImportProductState } from '@hook/dashboard/import/use-import-product-state.ts';
import { importProductActionAtom } from '@store/state/overview/import-product.ts';
import { unitVi } from '@global/locale.ts';
import { createImportProduct } from '@api/import.ts';
import useToast from '@hook/client/use-toast-notification.ts';
import { cn } from '@lib/tailwind-merge';

function ImportTab() {
	const {generateUID} = useUID();
	const {branchId} = useDashboard()
	const {userSessionInfo} = useAuth();

	const {
		addProductItem,
		importProducts,
		activeTab,
		removeProductItem,
		updateProductState,
		updateProductInvoice
	} = useImportProductState();

	const {showSuccessToast, showErrorToast} = useToast();

	const [autoprint, setAutoprint] = useState(false)
	const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());
	// const [consumerPayment, setConsumerPayment] = useState<number>(0);
	const [branchDetail] = useAtom(currentBranchAtom);
	const [, importProductActions] = useAtom(importProductActionAtom);

	// const [invoices, invoiceDispatch] = useAtom(invoiceActionAtom);
	// const [activeTab, activeTabDispatch] = useAtom(invoiceActiveTabActionAtom);

	const [submitting, setSubmitting] = useState<boolean>(false);

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
		? importProducts[activeTab]?.productData || []
		: [];


	const handleInvoiceSubmit = async () => {
		setSubmitting(true);
		console.log('submit invoice', importProducts[activeTab]);
		const activeInvoice = importProducts[activeTab];
		if (!activeInvoice) return;
		if (!activeInvoice.productData.length) return;
		await createImportProduct(importProducts[activeTab], branchId)
			.then((res) => {
				setSubmitting(false);
				showSuccessToast('Đã tạo hóa đơn thành công');
			})
			.catch((res => {
				setSubmitting(false);
				showErrorToast(res.message);
			}));
	}

	useEffect(() => {
		let total = importProducts[activeTab]?.total || 0;
		// const discount = importProducts[activeTab]?.invoiceData?.discount || 0;
		const amountDue = importProducts[activeTab]?.amountDue || 0;
		const debited = importProducts[activeTab]?.debit || 0;
		const otherCharges = [{
			name: 'Phí vận chuyển',
			value: 0,
		}];
		const amountPaid = importProducts[activeTab]?.amountPaid || 0;

		// console.log('import products', importProducts);

		setTotalPrice(total);
		// setDiscountState(discount);
		setAmountDue(amountDue);
		setDebited(amountPaid === 0 ? 0 : debited);
		setOtherCharges(otherCharges);
	}, [importProducts, activeTab]);

	// update price by vat change
	// useEffect(() => {
	// 	const vatPrice = (totalPrice * vat) / 100;
	// 	const total = totalPrice + vatPrice;
	//
	// 	// setTotalPrice(total);
	// 	setAmountDue(total);
	// }, [vat]);



	return (
		<>
			<Stack w={"100%"} gap={0}>
				{/*<Resizable className={"flex-grow"} w={"100%"} h={"600px"} direction={"vertical"}>*/}
				{/*	<ScrollArea h={600} className={'flex-grow w-full h-800px]'}>*/}
						<ProductFormV3 />
					{/*</ScrollArea>*/}
				{/*</Resizable>*/}
				<Divider size="md" />

				<ScrollArea h={300} pos={'relative'} id={'table'} className=" flex flex-grow h-full overflow-hidden p-4 bg-white">
					{/* Main content area */}
					<div className="w-full h-full relative">
						<div className="hidden">
							<div ref={componentRef}
									 className="flex flex-col justify-start items-center gap-5 p-8 w-full max-w-[21cm] mx-auto bg-white">
								{/* Header */}
								<div className="text-center mb-6">
									<h1 className="text-3xl font-bold">{branchDetail?.branch_name}</h1>
									<p className="text-xl">{branchDetail?.address}</p>
									<h2 className="text-xl font-bold mt-4">HÓA ĐƠN BÁN HÀNG</h2>
									<p className="text-xl">Số HĐ: {importProducts[activeTab].id}</p>
									<p className="text-xl">Ngày: {new Date().toLocaleString()}</p>
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
											<td className="p-2">{product.name}</td>
											<td className="p-2">{product.unit}</td>
											<td className="p-2">
												{product.quantity}
											</td>
											<td className="p-2">
												{product.purchasePrice.toLocaleString()}đ
											</td>
											<td className="p-2">{(product.purchasePrice * product.quantity).toLocaleString()}đ</td>
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
						<div className="w-full h-full bg-white shadow">
							<Table striped highlightOnHover verticalSpacing="xs">
								<Table.Thead>
									<Table.Tr>
										<Table.Th className="bg-white sticky top-0 z-[100] whitespace-nowrap">STT</Table.Th>
										<Table.Th className="bg-white sticky top-0 z-[100] whitespace-nowrap">Tên sản phẩm</Table.Th>
										<Table.Th className="bg-white sticky top-0 z-[100] whitespace-nowrap">Đơn vị</Table.Th>
										<Table.Th className="bg-white sticky top-0 z-[100] whitespace-nowrap">Số lượng</Table.Th>
										<Table.Th className="bg-white sticky top-0 z-[100] whitespace-nowrap">Đơn giá</Table.Th>
										<Table.Th className="bg-white sticky top-0 z-[100] whitespace-nowrap">Thành tiền</Table.Th>
										<Table.Th className="bg-white sticky top-0 z-[100] whitespace-nowrap">Ghi Chú/Liều dùng</Table.Th>
										<Table.Th className="bg-white sticky top-0 z-[100] whitespace-nowrap"></Table.Th>
									</Table.Tr>
								</Table.Thead>
								<Table.Tbody>
									{cartItems.map((product, index) => (
										<Table.Tr key={`tr-${generateUID()}`} className="border-b">
											<Table.Td className="p-1">{index + 1}</Table.Td>
											<Table.Td className="p-1">{product.name}</Table.Td>
											<Table.Td className="p-1">{unitVi?.[product.unit as keyof typeof unitVi] || product.unit}</Table.Td>
											<Table.Td className="p-2">
												<NumberInput
													className={'!w-16'}
													defaultValue={product.quantity}
													allowNegative={false}
													allowDecimal={false}
													onBlur={(quantity) => {
														console.log('quantity', quantity.currentTarget.value);
														// updateProductState(index, {
														// 	quantity: Number(quantity) || 1,
														// });
														const quantityValue = Number(quantity.currentTarget.value) || 1;

														if (quantityValue === product.quantity) return;

														importProductActions({
															type: 'update-product',
															invoiceId: activeTab,
															index: index,
															state: {
																quantity: Number(quantity.currentTarget.value) || 1
															}
														});
													}} />
											</Table.Td>
											<Table.Td className="p-1">
												<MoneyInput
													value={product.purchasePrice}
													onChange={(value) => {
														console.log('value', value);
														// updateProductState(index, { purchasePrice: value });
														importProductActions({
															type: 'update-product',
															invoiceId: activeTab,
															index: index,
															state: {
																purchasePrice: value || 0
															}
														});
													}}

													className={'w-[120px]'}
												/>
												{/*{product.price.toLocaleString()}đ*/}
											</Table.Td>
											<Table.Td className="p-1">{(product.purchasePrice * product.quantity).toLocaleString()}đ</Table.Td>
											<Table.Td className="p-1">
												<Textarea
													defaultValue={product.note}
													onBlur={(e) => {
														importProductActions({
															type: 'update-product',
															invoiceId: activeTab,
															index: index,
															state: {
																note: e.currentTarget.value
															}
														});
													}}
												/>
											</Table.Td>
											<Table.Td className="p-1">
												<button onClick={() => {
													removeProductItem(activeTab, index);
													// removeItem(product.id || '')
												}}
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
						<Label label={"Nhà cung cấp"}>
							<div className={"w-full relative"}>
								<ProviderAutocomplete
									setValue={({ name, id }) => {
										console.log('provider', name, id);
										// // updateProductInvoice(activeTab, { provider: id })
										// importProductActions({
										// 	type: 'update',
										// 	invoiceId: activeTab,
										// 	state: {
										// 		provider: id
										// 	}
										// });
										updateProductInvoice(activeTab, { provider: id })
									}} />
								<ProviderModal>
									<button
										className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600">
										<Plus className="h-5 w-5" />
									</button>
								</ProviderModal>
							</div>
						</Label>
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
										console.log('vat', value);
										updateProductInvoice(activeTab, { vat: Number(value) })
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
							<Typography color={"primary"} weight={"semibold"}>Cần trả nhà cung cấp</Typography>
							<span className="text-2xl font-bold text-emerald-600 px-2 py-1 rounded">
								{amountDue.toLocaleString()}đ
							</span>
						</div>
						<div className="flex justify-between items-center">
							<Typography weight={"semibold"}>Thanh toán (F2)</Typography>
							<div className="flex items-center gap-2">
								{activeTab ? (
									<MoneyInput
										value={importProducts[activeTab]?.amountPaid || 0}
										onChange={(value) => {
											console.log('consumer payment', value);

											updateProductInvoice(activeTab, { amountPaid: value })
											// setConsumerPayment(value);
										}}
										className={'w-[120px]'}
									/>
								) : null}
							</div>
						</div>
						<div className="flex justify-between items-center">
							<Typography >{debited < 0 ? "Công nợ" : 'Hoàn tiền'}</Typography>
							<span className="text-lg font-medium text-zinc-700 px-2 py-1 rounded">
								{Math.abs(debited).toLocaleString()}đ
							</span>
						</div>
					</div>

					<textarea
						placeholder="Ghi chú"
						className="w-full p-2 border rounded resize-none"
						rows={2}
						onBlur={(e) => {
							updateProductInvoice(activeTab, { notes: e.currentTarget.value })
						}}
					></textarea>

					{/*<div className="flex justify-between items-center">*/}
					{/*	<span className="text-sm">Tự động in hóa đơn khi thanh toán</span>*/}
					{/*	<label className="relative inline-flex items-center cursor-pointer">*/}
					{/*		<Switch*/}
					{/*			checked={autoprint}*/}
					{/*			color={"teal"}*/}
					{/*			size={"md"}*/}
					{/*			onChange={(event) => setAutoprint(event.currentTarget.checked)}*/}
					{/*		/>*/}
					{/*	*/}
					{/*	</label>*/}
					{/*</div>*/}

					{/*<div className={''}>*/}
					{/*	<FileInput*/}
					{/*		onChange={(file) => {*/}
					{/*			const reader = new FileReader();*/}
					{/*			reader.onload = (e) => {*/}
					{/*				// qrURLRef.current = e.target?.result as string;*/}
					{/*				setQrURL(e.target?.result as string);*/}
					{/*			};*/}
					{/*			if (file) reader.readAsDataURL(file);*/}
					{/*		}}*/}
					{/*		description={'Chọn file qr'}*/}
					{/*	/>*/}
					{/*</div>*/}
					<button
						onClick={() => {
							void handleInvoiceSubmit();
							if (autoprint) reactToPrintFn();
						}}
						className={cn("w-full py-3 bg-teal-500 text-white rounded text-lg hover:bg-teal-600 transition-all ", {
							'bg-zinc-300 hover:bg-zinc-200 cursor-not-allowed': submitting
						})}
						disabled={submitting}
					>
						{submitting ? 'Đang xử lý...' : 'Thanh toán (F7)'}
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