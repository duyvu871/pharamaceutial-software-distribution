import { z } from 'zod';

const productDataItemSchema = z.object({
	name: z.string({ message: 'Tên sản phẩm là bắt buộc' }),
	type: z.enum(
		['thuoc', 'thuc-pham-chuc-nang', 'my-pham', 'dung-cu-y-te', 'hang-hoa-khac'],
		{
			message: 'Loại sản phẩm không hợp lệ'
		}
	),
	code: z.string({
		message: 'Mã sản phẩm là bắt buộc'
	}),
	registrationNumber: z.string({
		invalid_type_error: 'Số đăng kí không hợp lệ'
	}),
	barcode: z.string({
		invalid_type_error: 'Mã vạch không hợp lệ'
	}),
	purchasePrice: z.number().min(0),
	sellingPrice: z.number().min(0),
	manufacturer: z.string(),
	usage: z.string(),
	ingredients: z.string(),
	packaging: z.string(),
	activeIngredient: z.string(),
	content: z.string(),
	lotNumber: z.string(),
	expiryDate: z.string().datetime(),
	quantity: z.number().int().min(0),
	importDate: z.string().datetime(),
	// unitId: z.string(),
	unit: z.string(),
	largerUnit: z.string(),
	largerUnitValue: z.string(),
	note: z.string(),
	images: z.array(z.string())
});

export const importProductSchema = z.object({
	id: z.string(),
	name: z.string(),
	time: z.string().datetime(),
	vat: z
		.number()
		.int()
		.min(0, {
			message: 'VAT không hợp lệ'
		})
		.max(100, {
			message: 'VAT không hợp lệ'
		}),
	total: z.number().min(0),
	debit: z.number(),
	amountDue: z.number().min(0),
	amountPaid: z.number().min(0),
	notes: z.string(),
	provider: z.string(),
	productData: z.array(productDataItemSchema),
});


export class ImportValidation {
	public static createImportProduct = importProductSchema;
}

export type ImportProductBody = z.infer<typeof ImportValidation.createImportProduct>;
export type ProductDataItem = z.infer<typeof productDataItemSchema>;