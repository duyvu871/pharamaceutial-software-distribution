import { z } from 'zod';
import { validateNumber } from 'utils/number.ts';
import { ProductValidation } from 'validations/Product.ts';


const productDataItemSchema = z.object({
	name: z.string({
		message: 'Tên sản phẩm là bắt buộc'
	}),
	type: z.enum(['thuoc', 'thuc_pham_chuc_nang', 'my_pham', 'dung_cu_y_te', 'hang_hoa_khac'], {
		message: 'Loại sản phẩm không hợp lệ'
	}),
	code: z.string({
		message: 'Mã sản phẩm là bắt buộc'
	}),
	registrationNumber: z.string({
		invalid_type_error: 'Số đăng kí không hợp lệ'
	}).optional(),
	purchasePrice: validateNumber("page", true),//z.number(),
	sellingPrice: validateNumber("page", true),//z.number(),
	manufacturer: z.string().optional(),
	usage: z.string().optional().optional(),
	ingredients: z.string().optional().optional(),
	packaging: z.string().optional().optional(),
	activeIngredient: z.string().optional().optional(),
	content: z.string().optional().optional(),
	lotNumber: z.string().optional(),
	expiryDate: z.string().datetime().optional(),
	quantity: validateNumber("page", true, true),//z.number(),
	importDate: z.string().datetime().optional(),
	unit: z.string().optional(),
	largerUnit: z.string().optional(),
	largerUnitValue: z.string().optional().optional(),
	images: z.array(z.string()).optional()
});

export const importProductSchema = z.object({
	id: z.string(),
	name: z.string(),
	time: z.string().datetime(),
	vat: validateNumber("page", true).transform(String),//z.number(),
	total: validateNumber("page", true, true),//z.number(),
	debit: validateNumber("page"), //z.number(),
	amountDue: validateNumber("page", true),//z.number(),
	amountPaid: validateNumber("page", true),//z.number(),
	notes: z.string().optional(),
	provider: z.string().optional(),
	productData: z.array(productDataItemSchema),
});


export class ImportValidation {
	public static createImportProduct = importProductSchema;
}

export type ImportProductBody = z.infer<typeof ImportValidation.createImportProduct>;
export type ProductDataItem = z.infer<typeof productDataItemSchema>;