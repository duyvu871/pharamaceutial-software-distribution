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
	point: z.object({
		used: z.number().optional().default(0),
		pointValue: z.number().optional().default(0),
	}).optional(),
	vat: z.number().optional().default(0),
	customerName: z.string().optional(),
	customerId: z.string().optional(),
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
		type: z.enum(['user', 'membership', 'admin']).default('user'),
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
		unit: z.string().refine(val => val.length > 0, {
			message: "Đơn vị là bắt buộc"
		}),
		note: z.string().optional(),
	})),
});

export type InvoiceType = z.infer<typeof invoiceSchema>;

export const prescriptionSchema = z.object({
	prescriptionId: z.string(),
	prescriptionDate: z.date({ required_error: 'Ngày kê đơn là bắt buộc' }),
	doctor: z.string().min(1, { message: 'Bác sĩ kê đơn là bắt buộc' }),
	facility: z.string().min(1, { message: 'Cơ sở khám bệnh là bắt buộc' }),
	diagnosis: z.string(),
	patientName: z.string().min(1, { message: 'Tên bệnh nhân là bắt buộc' }),
	birthDate: z.date({ required_error: 'Ngày sinh là bắt buộc' }),
	age: z.number().min(0),
	ageMonths: z.number().min(0),
	weight: z.number().nonnegative({ message: 'Cân nặng phải lớn hơn 0' }),
	gender: z.string().min(1, { message: 'Giới tính là bắt buộc' }),
	address: z.string().min(1, { message: 'Địa chỉ là bắt buộc' }),
	insuranceCard: z.string(),
	phone: z.string(),
	guardianInfo: z.string(),
})

export type PrescriptionFormData = z.infer<typeof prescriptionSchema>;