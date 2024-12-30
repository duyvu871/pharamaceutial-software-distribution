import { z } from 'zod';

export type ProductRender = {
	id: string;
	code: string;
	name: string;
	unit: string;
	costPrice: number;
	sellPrice: number;
	stock: number;
	status: 'active' | 'inactive';
};

export const ProductZodSchema = z.object({
	store_id: z.number().or(z.string()),
	id: z.string(),
	product_type: z.string(),
	medicine_id: z.number().nullable(),
	barcode: z.string().nullable(),
	product_no: z.string(),
	product_name: z.string(),
	shortcut: z.string().nullable(),
	original_price: z.number(),
	sell_price: z.number(),
	weight: z.number().nullable(),
	quantity_of_stock: z.number(),
	group_id: z.number().nullable(),
	using_id: z.number(),
	base_unit: z.string(),
	status: z.number(),
	created_at: z.number(),
	updated_at: z.number(),
	min_quantity: z.number(),
	max_quantity: z.number(),
	description: z.string().nullable(),
	note: z.string().nullable(),
	manufacturer: z.string().nullable(),
	made_in: z.string().nullable(),
	deleted_at: z.number().nullable(),
	deleted_by: z.number().nullable(),
	avg_original_price: z.number(),
	default_image: z.string().nullable(),
	productUnit: z.object({
		id: z.number(),
		product_id: z.number(),
		name: z.string(),
		value: z.number(),
		sell_price: z.number(),
		no: z.string(),
		is_base: z.number(),
		original_price: z.number(),
		quantity_of_stock: z.number(),
		latest_parcel_no: z.string().nullable(),
		latest_parcel_exp_date: z.string().nullable(),
		avg_original_price: z.number(),
	}),
	quantity: z.object({
		id: z.number(),
		store_id: z.number(),
		branch_id: z.number(),
		product_id: z.number(),
		number: z.number(),
	}),
});

export type Product = z.infer<typeof ProductZodSchema>;


export const productFormSchema = z.object({
	name: z.string().min(1, { message: 'Tên là bắt buộc' }),
	type: z.enum(['thuoc', 'thuc_pham_chuc_nang', 'my_pham', 'dung_cu_y_te', 'hang_hoa_khac']),
	code: z.string(),
	registrationNumber: z.string().min(1, { message: 'Số đăng kí là bắt buộc' }),
	purchasePrice: z.number().nonnegative({ message: 'Giá nhập phải lớn hơn 0' }),
	sellingPrice: z.number().nonnegative({ message: 'Giá bán phải lớn hơn 0' }),
	manufacturer: z.string().min(1, { message: 'Công ty sản xuất là bắt buộc' }),
	usage: z.string().optional(),
	ingredients: z.string().optional(),
	packaging: z.string().optional(),
	activeIngredient: z.string().optional(),
	content: z.string().optional(),
	lotNumber: z.string().min(1, { message: 'Số lô là bắt buộc' }),
	expiryDate: z.date({ required_error: 'Hạn sử dụng là bắt buộc' }),
	quantity: z.number().int().nonnegative({ message: 'Số lượng nhập phải là số nguyên dương' }),
	importDate: z.date({ required_error: 'Ngày nhập hàng là bắt buộc' }),
	useBefore: z.string(),
	vat: z.string(),
	unit: z.enum(['vien', 'vi', 'goi', 'chai', 'lo', 'hop']),
	largerUnit: z.string(),
	largerUnitValue: z.string(),
	notes: z.string().optional(),
})

export type ProductFormData = z.infer<typeof productFormSchema>