import { z } from 'zod';
import { validateNumber } from 'utils/number';


export class ProductValidation {
	public static getProductQuery = z.object({
		page: validateNumber("page", true).optional(),
		limit: validateNumber("limit", true).optional(),
		search: z.string().optional(),
		orderBy: z
			.string()
			.optional()
			.refine((orders) =>
					orders
						? orders
							.split(',')
							.every((order) =>
								['ASC', 'DESC'].includes(order.split(':')[1])
							)
						: false,
				{
					message: 'Invalid order value provided'
				}
			).innerType()
	})
	public static createProduct = z.object({
		name: z.string().min(1, { message: 'Tên là bắt buộc' }),
		type: z.enum(['thuoc', 'thuc_pham_chuc_nang', 'my_pham', 'dung_cu_y_te', 'hang_hoa_khac']),
		code: z.string(),
		registrationNumber: z.string().min(1, { message: 'Số đăng kí là bắt buộc' }),
		purchasePrice: validateNumber("purchasePrice", true),//.nonnegative({ message: 'Giá nhập phải lớn hơn 0' }),
		sellingPrice: validateNumber("sellingPrice", true),//z.number().nonnegative({ message: 'Giá bán phải lớn hơn 0' }),
		manufacturer: z.string().min(1, { message: 'Công ty sản xuất là bắt buộc' }),
		usage: z.string().optional(),
		ingredients: z.string().optional(),
		packaging: z.string().optional(),
		activeIngredient: z.string().optional(),
		content: z.string().optional(),
		lotNumber: z.string().min(1, { message: 'Số lô là bắt buộc' }),
		expiryDate: z.date({ required_error: 'Hạn sử dụng là bắt buộc' }),
		quantity: validateNumber("quantity", true, true),//z.number().int().nonnegative({ message: 'Số lượng nhập phải là số nguyên dương' }),
		importDate: z.date({ required_error: 'Ngày nhập hàng là bắt buộc' }),
		useBefore: z.string(),
		vat: z.string(),
		unit: z.enum(['vien', 'vi', 'goi', 'chai', 'lo', 'hop']),
		largerUnit: z.string(),
		largerUnitValue: z.string(),
	});

	public static deleteProductParams = z.object({
		productId: z.string().uuid(),
		branchId: z.string().uuid(),
	});

	public static getStoreProductQuery = z.object({
		type: z.enum(['thuoc', 'thuc-pham-chuc-nang', 'my-pham', 'dung-cu-y-te', 'hang-hoa-khac'], {
			message: "Loại sản phẩm không hợp lệ"
		}).optional(),
	});

	public static productType = z.object({
		productType: z.enum(['thuoc', 'thuc-pham-chuc-nang', 'my-pham', 'dung-cu-y-te', 'hang-hoa-khac']).optional()
	})

	public static productIdParams = z.object({
		productId: z
			.string({
				message: "Product ID is not valid",
			})
			.uuid({
				message: "Product ID is not valid",
			}),
	});

	public static updateProduct = z.object({
		barcode: z.string().optional(),
		register_no: z.string().optional(),
		product_name: z.string(),
		original_price: z.number(),
		sell_price: z.number(),
		weight: z.number().optional(),
		base_unit: z.string(),
		status: z.number().optional(),
		import_date: z.string().datetime().optional(),
		expire_date: z.string().datetime().optional(),
		description: z.string().optional(),
		usage: z.string().optional(),
		ingredient: z.string().optional(),
		packing: z.string().optional(),
		active_ingredient: z.string().optional(),
		content: z.string().optional(),
		note: z.string().optional(),
		manufacturer: z.string().optional(),
		made_in: z.string().optional(),
	})
}

export type ProductQuery = z.infer<typeof ProductValidation.getProductQuery>;
export type CreateProduct = z.infer<typeof ProductValidation.createProduct>;
export type DeleteProductParams = z.infer<typeof ProductValidation.deleteProductParams>;
export type GetStoreProductQuery = z.infer<typeof ProductValidation.getStoreProductQuery>;
export type ProductType = z.infer<typeof ProductValidation.productType>;
export type ProductIdParam = z.infer<typeof ProductValidation.productIdParams>;
export type UpdateProduct = z.infer<typeof ProductValidation.updateProduct>;