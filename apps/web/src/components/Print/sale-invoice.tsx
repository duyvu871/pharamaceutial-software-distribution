// import React from 'react';
// import { readNumber } from '@util/number.ts';
// import { useReactToPrint } from 'react-to-print';
// import { useDashboard } from '@hook/dashboard/use-dasboard.ts';
// import {Image} from '@mantine/core';
// import { useUID } from '@hook/common/useUID.ts';
//
// export type SaleInvoiceProps = {
// 	invoiceId: string;
// }
//
// function SaleInvoice({}: SaleInvoiceProps) {
// 	const {branchId} = useDashboard();
// 	const {generateUID} = useUID();
//
// 	const componentRef = React.useRef(null);
// 	const reactToPrintFn = useReactToPrint({ contentRef: componentRef });
// 	// const BranchDetail = useBranchDetail(branchId);
//
// 	return (
// 		<div className="hidden">
// 			<div ref={componentRef}
// 					 className="flex flex-col justify-start items-center p-5 w-full max-w-[21cm] mx-auto bg-white">
// 				{/* Header */}
// 				<div className="text-center mb-6 w-full">
// 					<h1 className="text-xl font-bold">{branchDetail?.branch_name}</h1>
// 					<div className={'w-full'}>
// 										<span className={'whitespace-nowrap inline'}>
// 											<p className="text-md whitespace-nowrap">Địa chỉ: {branchDetail?.address}</p>
// 										</span>
// 						<span className={'whitespace-nowrap'}>
// 											<p className="text-md whitespace-nowrap">SĐT:{branchDetail?.phone_number}</p>
// 										</span>
// 					</div>
// 					<h2 className="text-3xl font-bold mt-4">HÓA ĐƠN BÁN HÀNG</h2>
// 					<p className="text-xl"><span className={'font-medium'}>Số HĐ:</span> {invoices[activeTab].id}</p>
// 					<p className="text-xl"><span className={'font-medium'}>Ngày:</span> {new Date().toLocaleString()}</p>
// 				</div>
//
// 				{/* Customer Info */}
// 				<div className="mb-6 w-full text-left text-lg">
// 					<div className={'w-full flex justify-between item-center'}>
// 						<p>
// 							<span className="font-semibold">Khách hàng: </span>
// 							{invoices[activeTab].invoiceData.customerName || customer.name}
// 						</p>
// 						<p>
// 							<span className="font-semibold">Nhân viên bán hàng: </span>
// 							{userSessionInfo?.username}
// 						</p>
// 					</div>
// 					{prescriptionSale ? (
// 						<p>
// 							<span className="font-semibold">Bác sĩ: </span>
// 							{doctorSelected[activeTab]?.ten_bac_si} - {doctorSelected[activeTab]?.doctor_id}
// 						</p>
// 					) : null}
// 				</div>
//
// 				<table
// 					className="p-5 w-full table border-collapse border border-gray-300 [&_th,&_td]:whitespace-nowrap [&_th,&_td]:text-left">
// 					<thead className="border-b border-gray-300">
// 					<tr>
// 						<th>STT</th>
// 						<th>Tên sản phẩm</th>
// 						<th>Đơn vị</th>
// 						<th>Số lượng</th>
// 						<th>Đơn giá</th>
// 						<th>Thành tiền</th>
// 						<th>Ghi Chú/Liều dùng</th>
// 					</tr>
// 					</thead>
// 					<tbody>
// 					{cartItems.map((product, index) => (
// 						<tr key={`tr-${generateUID()}`} className="border-b">
// 							<td className="p-2">{index + 1}</td>
// 							<td className="p-2">{product.productName}</td>
// 							<td className="p-2">{product.unit}</td>
// 							<td className="p-2">
// 								{product.quantity}
// 							</td>
// 							<td className="p-2">
// 								{product.price.toLocaleString()}đ
// 							</td>
// 							<td className="p-2">{product.total.toLocaleString()}đ</td>
// 							<td className="p-2">
// 								{product.note}
// 							</td>
// 						</tr>
// 					))}
// 					</tbody>
// 				</table>
// 				<div className={"w-full flex flex-col justify-start item-start gap-2 text-xl my-4"}>
// 					<div>
// 						<p className={"font-semibold"}>Ghi chú:</p>
// 						<p className={"text-lg"}>{invoices[activeTab].invoiceData.notes}</p>
// 					</div>
// 				</div>
// 				<div className={'w-full flex justify-start item-start gap-2 text-2xl my-4'}>
// 					<p className={'font-bold'}>Tổng tiền:</p>
// 					<p className={'font-bold'}>
// 						{totalPrice.toLocaleString()}đ
//
// 					</p>
// 				</div>
// 				<div className={'w-full flex justify-start item-start gap-2 text-xl'}>
// 					<p className={'font-bold'}>Viết bằng chữ:</p>
// 					<p className={'font-normal'}>
// 						{readNumber(totalPrice.toString())}
// 					</p>
// 				</div>
// 				<div className={'w-full flex flex-col gap-5 item-start text-xl mt-10'}>
// 					<p>Thông tin liên hệ (zalo):</p>
// 					<div className={"p-5 border-2"}>
// 						<Image src={qrURL} />
// 					</div>
// 				</div>
// 			</div>
// 		</div>
// 	);
// }
//
// export default SaleInvoice;