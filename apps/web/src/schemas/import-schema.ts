import { Product } from '@schema/product-schema.ts';

export type ImportSchema = {
	id: string
	store_id: string
	provider_id: string
	invoice_no: string
	name: string
	total_amount: number
	amount_due: number
	amount_paid: number
	debit: number
	notes: string
	vat: number
	status: number
	createdAt: string
	updatedAt: string
}

export type ImportInvoiceProductSchema = {
	id: string;                     // ID chính, UUID
	import_invoice: string;         // ID hóa đơn nhập, UUID
	product_id: string;             // ID sản phẩm, UUID
	barcode?: string;               // Mã vạch sản phẩm (tùy chọn)
	register_no?: string;           // Số đăng ký (tùy chọn)
	type: string;                   // Loại sản phẩm, mặc định là "thuoc"

	quantity: number;               // Số lượng
	price: number;                  // Giá sản phẩm
	total: number;                  // Tổng giá trị
	expired_date: string;             // Hạn sử dụng, mặc định là ngày hiện tại
	import_date: string;              // Ngày nhập, mặc định là ngày hiện tại
	lot_no?: string;                // Số lô (tùy chọn)
	status: number;                 // Trạng thái, mặc định là 1
	larger_unit: string;            // Đơn vị lớn, mặc định là "Vỉ"
	larger_unit_value: number;      // Giá trị đơn vị lớn, mặc định là 1
	smaller_unit: string;           // Đơn vị nhỏ, mặc định là "Vỉ"
	smaller_unit_value: number;     // Giá trị đơn vị nhỏ, mặc định là 1

	note?: string;                  // Ghi chú (tùy chọn)

	usage?: string;                 // Cách sử dụng (tùy chọn)
	manufacturer?: string;          // Nhà sản xuất (tùy chọn)
	ingredients?: string;           // Thành phần (tùy chọn)
	packaging?: string;             // Đóng gói (tùy chọn)
	active_ingredient?: string;     // Hoạt chất (tùy chọn)
	content?: string;               // Hàm lượng (tùy chọn)

	createdAt: string;                // Ngày tạo, mặc định là ngày hiện tại
	updatedAt: string;                // Ngày cập nhật, tự động cập nhật khi thay đổi

	product?: Pick<Product, "product_name"|"id">
}