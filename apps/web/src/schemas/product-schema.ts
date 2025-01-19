import { z } from 'zod';
import { Asset } from '@type/api/upload.ts';
import { GroupStoreSchema } from '@schema/group-schema.ts';

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

export interface IProduct {
	id: string
	product_id: string
	store_id: string
	group_id: any
	store_group_id: string
	productUnit: string
	product_type: string
	medicine_id: any
	barcode: string
	product_no: string
	register_no: string
	product_name: string
	lot_no: string
	shortcut: any
	original_price: number
	sell_price: number
	weight: any
	quantity_of_stock: number
	using_id: number
	base_unit: string
	status: number
	import_date: string
	expire_date: string
	created_at: string
	updated_at: string
	min_quantity: number
	max_quantity: number
	description: string
	usage: string
	ingredient: string
	packing: string
	active_ingredient: any
	content: string
	note: string
	manufacturer: string
	made_in: string
	deleted_at: string
	deleted_by: string
	avg_original_price: number
	default_image: string
	quantity: string
}

export const ProductZodSchema = z.object({
	store_id: z.number().or(z.string()), // ID của cửa hàng, có thể là số hoặc chuỗi
	id: z.string(), // ID sản phẩm

	product_type: z.string(), // Loại sản phẩm
	medicine_id: z.number().nullable(), // ID thuốc (có thể null)
	barcode: z.string().nullable(), // Mã vạch sản phẩm (có thể null)
	product_no: z.string(), // Số sản phẩm
	product_name: z.string(), // Tên sản phẩm
	shortcut: z.string().nullable(), // Viết tắt tên sản phẩm (có thể null)
	original_price: z.number(), // Giá gốc
	product_id: z.string(), // Mã định danh sản phẩm
	register_no: z.string().nullable(), // Số đăng ký (có thể null)
	lot_no: z.string().nullable(), // Số lô (có thể null)
	sell_price: z.number(), // Giá bán
	weight: z.number().nullable(), // Khối lượng (có thể null)
	quantity_of_stock: z.number(), // Số lượng tồn kho
	group_id: z.number().nullable(), // ID nhóm sản phẩm (có thể null)
	using_id: z.number(), // ID trạng thái sử dụng
	base_unit: z.string(), // Đơn vị cơ bản
	status: z.number(), // Trạng thái sản phẩm
	import_date: z.string(), // Ngày nhập
	expire_date: z.string(), // Ngày hết hạn
	created_at: z.string(), // Ngày tạo
	updated_at: z.string(), // Ngày cập nhật
	min_quantity: z.number(), // Số lượng tối thiểu
	max_quantity: z.number(), // Số lượng tối đa
	description: z.string().nullable(), // Mô tả sản phẩm (có thể null)
	note: z.string().nullable(), // Ghi chú (có thể null)
	manufacturer: z.string().nullable(), // Nhà sản xuất (có thể null)
	drug_content: z.string().nullable(), // Thành phần (có thể null)
	drug_usage: z.string().nullable(), // Cách dùng (có thể null)
	drug_ingredients: z.string().nullable(), // Thành phần (có thể null)
	drug_packaging: z.string().nullable(), // Bao bì (có thể null)
	made_in: z.string().nullable(), // Nơi sản xuất (có thể null)
	deleted_at: z.number().nullable(), // Thời gian bị xóa (có thể null)
	deleted_by: z.number().nullable(), // Người xóa (có thể null)
	avg_original_price: z.number(), // Giá gốc trung bình
	default_image: z.string().nullable(), // Hình ảnh mặc định (có thể null)
	productUnit: z.object({ // Thông tin về đơn vị sản phẩm
		id: z.number(), // ID đơn vị
		product_id: z.number(), // ID sản phẩm
		name: z.string(), // Tên đơn vị
		value: z.number(), // Giá trị đơn vị
		sell_price: z.number(), // Giá bán của đơn vị
		no: z.string(), // Số đơn vị
		is_base: z.number(), // Có phải đơn vị cơ bản không (1 hoặc 0)
		original_price: z.number(), // Giá gốc của đơn vị
		quantity_of_stock: z.number(), // Số lượng tồn kho
		latest_parcel_no: z.string().nullable(), // Số lô gần nhất (có thể null)
		latest_parcel_exp_date: z.string().nullable(), // Ngày hết hạn của lô gần nhất (có thể null)
		avg_original_price: z.number(), // Giá gốc trung bình
	}).nullable(),
	quantity: z.object({ // Thông tin về số lượng sản phẩm
		id: z.number(), // ID số lượng
		store_id: z.number(), // ID cửa hàng
		branch_id: z.number(), // ID chi nhánh
		product_id: z.number(), // ID sản phẩm
		number: z.number(), // Số lượng
	}),
});




export type Product = {
	store_id: number | string;
	id: string;
	product_type: string;
	medicine_id: number | null;
	barcode: string | null;
	product_no: string;
	product_name: string;
	shortcut: string | null;
	original_price: number;
	product_id: string;
	register_no: string | null;
	lot_no: string | null;
	sell_price: number;
	weight: number | null;
	quantity_of_stock: number;
	group_id: number | null;
	using_id: number;
	base_unit: string;
	status: number;
	import_date: string;
	expire_date: string;
	created_at: string;
	updated_at: string;
	min_quantity: number;
	max_quantity: number;
	description: string | null;
	note: string | null;
	manufacturer: string | null;
	content: string | null;
	usage: string | null;
	active_ingredient: string | null;
	ingredients: string | null;
	packing: string | null;
	made_in: string | null;
	deleted_at: number | null;
	deleted_by: number | null;
	avg_original_price: number;
	default_image: string | null;
	productUnit: {
		id: number;
		product_id: number;
		name: string;
		value: number;
		sell_price: number;
		no: string;
		is_base: number;
		original_price: number;
		quantity_of_stock: number;
		latest_parcel_no: string | null;
		latest_parcel_exp_date: string | null;
		avg_original_price: number;
	} | null;
	product_assets: Asset[];
	store_group: GroupStoreSchema,
	quantity: {
		id: number;
		store_id: number;
		branch_id: number;
		product_id: number;
		number: number;
	} | {};
};
//z.infer<typeof ProductZodSchema>;


export const productFormSchema = z.object({
	name: z.string().min(1, { message: 'Tên là bắt buộc' }),
	type: z.enum(['thuoc', 'thuc-pham-chuc-nang', 'my-pham', 'dung-cu-y-te', 'hang-hoa-khac']),
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
	// lotNumber: z.string().min(1, { message: 'Số lô là bắt buộc' }),
	expiryDate: z.date({ required_error: 'Hạn sử dụng là bắt buộc' }),
	quantity: z.number().int().nonnegative({ message: 'Số lượng nhập phải là số nguyên dương' }),
	importDate: z.date({ required_error: 'Ngày nhập hàng là bắt buộc' }),
	barcode: z.string(),
	// useBefore: z.string().optional(),
	// vat: z.string(),
	unit: z.enum(['vien', 'vi', 'goi', 'chai', 'lo', 'hop']).or(z.string()),
	largerUnit: z.string().optional(),
	largerUnitValue: z.string().optional(),
	note: z.string().optional(),
	images: z.array(z.string()).optional(),
})

export type ProductFormData = z.infer<typeof productFormSchema>


export const creationProductSchema = z.object({
	// medicine_id: z.string().optional(),
	id: z.string().optional(),
	barcode: z.string().optional(),
	register_no: z.string().optional(),
	product_name: z.string(),
	original_price: z.number(),
	sell_price: z.number(),
	weight: z.number().optional(),
	base_unit: z.string(),
	status: z.number().optional(),
	import_date: z.date().optional(),
	expire_date: z.date().optional(),
	description: z.string().optional(),
	usage: z.string().optional(),
	ingredient: z.string().optional(),
	packing: z.string().optional(),
	active_ingredient: z.string().optional(),
	content: z.string().optional(),
	note: z.string().optional(),
	manufacturer: z.string().optional(),
	made_in: z.string().optional(),
});

export type CreationProductSchema = z.infer<typeof creationProductSchema>;