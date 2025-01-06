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
	}),
	quantity: z.object({ // Thông tin về số lượng sản phẩm
		id: z.number(), // ID số lượng
		store_id: z.number(), // ID cửa hàng
		branch_id: z.number(), // ID chi nhánh
		product_id: z.number(), // ID sản phẩm
		number: z.number(), // Số lượng
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
	// useBefore: z.string().optional(),
	// vat: z.string(),
	unit: z.enum(['vien', 'vi', 'goi', 'chai', 'lo', 'hop']).or(z.string()),
	largerUnit: z.string().optional(),
	largerUnitValue: z.string().optional(),
	notes: z.string().optional(),
	images: z.array(z.string()).optional(),
})

export type ProductFormData = z.infer<typeof productFormSchema>