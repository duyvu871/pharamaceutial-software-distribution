import React, { useRef } from 'react';
import { useReactToPrint } from "react-to-print";

interface InvoiceItem {
	name: string;
	unit: string;
	quantity: number;
	unitPrice: number;
	totalPrice: number;
	note: string;
}

interface InvoiceData {
	items: InvoiceItem[];
}

const PrintInvoiceComponent = ({items}: InvoiceData) => {
	const componentRef = useRef(null);
	const reactToPrintFn = useReactToPrint({ contentRef: componentRef });

	return (
		<div>
			<div style={{ display: "none" }}>
				<div ref={componentRef} className="p-4 bg-white shadow-md">
					<h2 className="text-2xl font-bold mb-4">Invoice</h2>
					<table className="w-full border-collapse">
						<thead>
						<tr className="bg-gray-100">
							<th className="border p-2">STT</th>
							<th className="border p-2">Tên sản phẩm</th>
							<th className="border p-2">Đơn vị</th>
							<th className="border p-2">Số lượng</th>
							<th className="border p-2">Đơn giá</th>
							<th className="border p-2">Thành tiền</th>
							<th className="border p-2">Ghi Chú/Liều dùng</th>
						</tr>
						</thead>
						<tbody>
						{items.map((item, index) => (
							<tr key={index} className="border-b">
								<td className="border p-2">{index + 1}</td>
								<td className="border p-2">{item.name}</td>
								<td className="border p-2">{item.unit}</td>
								<td className="border p-2">{item.quantity}</td>
								<td className="border p-2">{item.unitPrice}</td>
								<td className="border p-2">{item.totalPrice}</td>
								<td className="border p-2">{item.note}</td>
							</tr>
						))}
						</tbody>
					</table>
				</div>
			</div>

			<button onClick={() => reactToPrintFn()}>Print</button>
		</div>
	);
};


export default PrintInvoiceComponent;