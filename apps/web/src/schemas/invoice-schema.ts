import { z } from 'zod';

export const invoiceSchema = z.object({
	branchId: z.string().refine(val => val.length > 0, {
		message: "Chi nhánh là bắt buộc"
	}).refine(val => typeof val === 'string', {
		message: "Tên người dùng phải là chuỗi"
	}),
	saleDate: z.date().refine(val => !isNaN(val.getTime()), { // check for invalid date
		message: "Ngày bán hàng là bắt buộc"
	}),
	saleTime: z.string().refine(val => val.length > 0, {
		message: "Giờ bán hàng là bắt buộc"
	}).refine(val => typeof val === 'string', {
		message: "Giờ bán hàng phải là chuỗi"
	}),
	customerName: z.string().optional(),
	priceList: z.string().optional(),
	isPrescriptionSale: z.boolean().optional(),
	totalPrice: z.number().refine(val => !isNaN(val), {
		message: "Tổng giá phải là số"
	}), // Tổng giá trị của hóa đơn
	discount: z.number().optional().default(0),
	otherCharges: z.array(z.object({
		name: z.string(),
		value: z.number().default(0)
	})).default([]),
	amountDue: z.number().refine(val => !isNaN(val), {
		message: "Số tiền phải trả là bắt buộc"
	}), // Số tiền cần trả
	amountPaid: z.number().optional().default(0), // Số tiền khách hàng trả
	debit: z.number().optional().default(0), // Số tiền khách hàng nợ
	// outstandingBalance: z.number().optional().default(0), // Số dư còn lại
	notes: z.string().optional(),
	autoPrintInvoice: z.boolean().optional(), // Auto print invoice after sale
	printBatchNumber: z.boolean().optional(), // Batch number is a unique number assigned to a group of products
	user: z.object({
		type: z.enum(['user', 'membership']),
		id: z.string().optional(),
	}).optional(),
	items: z.array(z.object({
		id: z.string().optional(),
		productName: z.string().refine(val => val.length > 0, {
			message: "Tên sản phẩm là bắt buộc"
		}),
		quantity: z.number().refine(val => !isNaN(val), {
			message: "Số lượng phải là số"
		}),
		price: z.number().refine(val => !isNaN(val), {
			message: "Giá phải là số"
		}),
		total: z.number().refine(val => !isNaN(val), {
			message: "Tổng giá phải là số"
		}),
		note: z.string().optional(),
	})),
});

export type InvoiceType = z.infer<typeof invoiceSchema>;