import { z } from 'zod';
import { dateString } from 'validations/common.ts';

export class InvoiceValidation {
	public static createInvoice = z.object({
		branchId: z.string().refine(val => val.length > 0, { message: "Chi nhánh là bắt buộc" }),
		saleDate: dateString.innerType().refine(val => val.length > 0, {message: "Ngày bán hàng là bắt buộc"}), // Ngày bán hàng
		saleTime: z.string().refine(val => val.length > 0, { message: "Giờ bán hàng là bắt buộc" }).refine(val => typeof val === 'string', { message: "Giờ bán hàng phải là chuỗi" }),
		customerName: z.string().optional(),
		priceList: z.string().optional(),
		isPrescriptionSale: z.boolean().optional(),
		totalPrice: z.number().nonnegative({ message: "Tổng giá phải là số dương" }).refine(val => !isNaN(val), { message: "Tổng giá phải là số" }), // Tổng giá trị của hóa đơn
		discount: z.number().nonnegative({ message: "Giảm giá phải là số dương" }).optional().default(0),
		otherCharges: z.array(z.object({ name: z.string(), value: z.number().nonnegative().default(0) })).default([]),
		amountDue: z.number().nonnegative({ message: "Số tiền phải trả là bắt buộc" }).refine(val => !isNaN(val), { message: "Số tiền phải trả là bắt buộc" }), // Số tiền cần trả
		amountPaid: z.number().nonnegative({ message: "Số tiền khách hàng trả phải là số dương" }).optional().default(0), // Số tiền khách hàng trả
		debit: z.number({ message: "Số tiền khách hàng nợ phải là số" }).optional().default(0), // Số tiền khách hàng nợ
		// outstandingBalance: z.number().optional().default(0), // Số dư còn lại
		notes: z.string().optional(),
		autoPrintInvoice: z.boolean().optional(), // Auto print invoice after sale
		printBatchNumber: z.boolean().optional(), // Batch number is a unique number assigned to a group of products
		user: z.object({ type: z.enum(['user', 'membership']), id: z.string(), }),
		items: z.array(z.object({
			id: z.string().optional(),
			productName: z.string().refine(val => val.length > 0, {
				message: "Tên sản phẩm là bắt buộc"
			}),
			quantity: z.number().nonnegative({
				message: "Số lượng phải là số dương"
			}).refine(val => !isNaN(val), {
				message: "Số lượng phải là số"
			}),
			price: z.number().nonnegative({
				message: "Giá phải là số dương"
			}).refine(val => !isNaN(val), {
				message: "Giá phải là số"
			}),
			total: z.number().nonnegative({
				message: "Tổng giá phải là số dương"
			}).refine(val => !isNaN(val), {
				message: "Tổng giá phải là số"
			}),
			unit: z.string().refine(val => val.length > 0, {
				message: "Đơn vị là bắt buộc"
			}),
			note: z.string().optional(),
		})),
	})

	public static updateInvoice = this.createInvoice.partial();

	public static invoiceId = z.object({
		invoiceId: z.string().uuid()
	});
}

export type CreateInvoice = z.infer<typeof InvoiceValidation.createInvoice>;
export type UpdateInvoice = z.infer<typeof InvoiceValidation.updateInvoice>;
export type InvoiceId = z.infer<typeof InvoiceValidation.invoiceId>;