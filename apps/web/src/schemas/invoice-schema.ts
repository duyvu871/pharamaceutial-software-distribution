import { z } from 'zod';

export const invoiceSchema = z.object({
	invoice_id: z.string().optional(),
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

export type InvoiceWithPrescriptionType = InvoiceType & {
	prescription: PrescriptionFormData;
}

export type PrescriptionSchema = {
	id: string;
	invoiceId: string
	prescription_id: string,
	ma_don_thuoc: string;
	ngay_ke: Date;
	bac_si_id: string;
	co_so_kham: string;
	chuan_doan?: string;
	benh_nhan: string;
	ngay_sinh?: Date;
	nam_sinh?: number;
	tuoi?: number;
	thang_tuoi?: number;
	can_nang?: number;
	dia_chi?: string;
	nguoi_giam_ho?: string;
	cmnd?: string;
	dien_thoai?: string;
	the_bhyt?: string;
	gioi_tinh: number;

	created_at: Date;
	updated_at: Date;
};

export const prescriptionCreationSchema = z.object({
	ma_don_thuoc: z.string().optional(), // Mã đơn thuốc (bắt buộc)
	ngay_ke: z.date({
		message: 'Ngày kê đơn là bắt buộc'
	}),        // Ngày kê đơn (bắt buộc)
	bac_si_id: z.string({
		message: 'Bác sĩ là bắt buộc'
	}),    // ID bác sĩ (bắt buộc)
	co_so_kham: z.string({
		message: 'Cơ sở khám là bắt buộc'
	}),   // Cơ sở khám (bắt buộc)
	chuan_doan: z.string().optional(), // Chuẩn đoán (tuỳ chọn)
	benh_nhan: z.string({
		message: 'Bệnh nhân là bắt buộc'
	}),    // Bệnh nhân (bắt buộc)
	ngay_sinh: z.date().optional(),    // Ngày sinh (tuỳ chọn)
	nam_sinh: z.number().int().optional(), // Năm sinh (tuỳ chọn, số nguyên)
	tuoi: z.number().int().optional(),     // Tuổi (tuỳ chọn, số nguyên)
	thang_tuoi: z.number().int().optional(), // Tháng tuổi (tuỳ chọn, số nguyên)
	can_nang: z.number().optional(),      // Cân nặng (tuỳ chọn, số thực)
	dia_chi: z.string({
		message: 'Địa chỉ là bắt buộc'
	}),       // Địa chỉ (tuỳ chọn)
	nguoi_giam_ho: z.string({
		message: 'Người giám hộ là bắt buộc'
	}), // Người giám hộ (tuỳ chọn)
	cmnd: z.string().optional(),          // CMND (tuỳ chọn)
	dien_thoai: z.string()
		.regex(/((09|03|07|08|05)+([0-9]{8})\b)/g, { message: 'Số điện thoại không hợp lệ' })
		.optional(),    // Điện thoại (tuỳ chọn)
	the_bhyt: z.string().optional(),      // Thẻ BHYT (tuỳ chọn)
	gioi_tinh: z.number().int()           // Giới tính (bắt buộc, số nguyên)
});

export type PrescriptionCreationSchema = z.infer<typeof prescriptionCreationSchema>;