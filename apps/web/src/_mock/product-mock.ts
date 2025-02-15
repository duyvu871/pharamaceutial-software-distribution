import { Product, ProductRender } from '@schema/product-schema.ts';

export const mockProductDetails: Product[] = [
	// {
	// 	store_id: 4787,
	// 	id: 579479,
	// 	product_type: 'merchandise',
	// 	medicine_id: null,
	// 	barcode: null,
	// 	product_no: '105402004',
	// 	product_name: 'Thống Kinh Bổ Huyết P/H (Hộp 1 lọ 60 viên)',
	// 	shortcut: null,
	// 	original_price: 60000,
	// 	sell_price: 70000,
	// 	weight: null,
	// 	quantity_of_stock: 0,
	// 	group_id: null,
	// 	using_id: -1,
	// 	base_unit: 'Hộp',
	// 	status: 10,
	// 	created_at: 1730705700,
	// 	updated_at: 1730705700,
	// 	min_quantity: 0,
	// 	max_quantity: 0,
	// 	description: null,
	// 	note: null,
	// 	manufacturer: null,
	// 	made_in: null,
	// 	deleted_at: null,
	// 	deleted_by: null,
	// 	avg_original_price: 60000,
	// 	default_image: null,
	// 	productUnit: {
	// 		id: 675383,
	// 		product_id: 579479,
	// 		name: 'Hộp',
	// 		value: 1,
	// 		sell_price: 70000,
	// 		no: '105402004',
	// 		is_base: 1,
	// 		original_price: 60000,
	// 		quantity_of_stock: 0,
	// 		latest_parcel_no: null,
	// 		latest_parcel_exp_date: null,
	// 		avg_original_price: 0,
	// 	},
	// 	quantity: {
	// 		id: 561236,
	// 		store_id: 4787,
	// 		branch_id: 4780,
	// 		product_id: 579479,
	// 		number: 0,
	// 	},
	// },
	// {
	// 	store_id: 4787,
	// 	id: 579480,
	// 	product_type: 'merchandise',
	// 	medicine_id: null,
	// 	barcode: '8936067760019',
	// 	product_no: 'SP002',
	// 	product_name: 'Sữa rửa mặt Cetaphil 250ml',
	// 	shortcut: 'SRM Cetaphil',
	// 	original_price: 90000,
	// 	sell_price: 110000,
	// 	weight: 300,
	// 	quantity_of_stock: 50,
	// 	group_id: 1,
	// 	using_id: -1,
	// 	base_unit: 'Chai',
	// 	status: 10,
	// 	created_at: 1730705700,
	// 	updated_at: 1730705750,
	// 	min_quantity: 5,
	// 	max_quantity: 100,
	// 	description: 'Sữa rửa mặt dịu nhẹ cho da nhạy cảm',
	// 	note: 'Hàng nhập khẩu',
	// 	manufacturer: 'Cetaphil',
	// 	made_in: 'Canada',
	// 	deleted_at: null,
	// 	deleted_by: null,
	// 	avg_original_price: 85000,
	// 	default_image:
	// 		'https://cdn.example.com/images/cetaphil-gentle-skin-cleanser-250ml.jpg',
	// 	productUnit: {
	// 		id: 675384,
	// 		product_id: 579480,
	// 		name: 'Chai',
	// 		value: 1,
	// 		sell_price: 110000,
	// 		no: 'SP002',
	// 		is_base: 1,
	// 		original_price: 90000,
	// 		quantity_of_stock: 50,
	// 		latest_parcel_no: 'LOT001',
	// 		latest_parcel_exp_date: '2025-12-31',
	// 		avg_original_price: 90000,
	// 	},
	// 	quantity: {
	// 		id: 561237,
	// 		store_id: 4787,
	// 		branch_id: 4780,
	// 		product_id: 579480,
	// 		number: 50,
	// 	},
	// },
	// {
	// 	store_id: 4787,
	// 	id: 579481,
	// 	product_type: 'merchandise',
	// 	medicine_id: null,
	// 	barcode: '8809685635416',
	// 	product_no: 'SP003',
	// 	product_name: 'Kem Chống Nắng Anessa Perfect UV Sunscreen Skincare Milk 60ml',
	// 	shortcut: 'KCN Anessa',
	// 	original_price: 200000,
	// 	sell_price: 250000,
	// 	weight: 100,
	// 	quantity_of_stock: 20,
	// 	group_id: 1,
	// 	using_id: -1,
	// 	base_unit: 'Tuýp',
	// 	status: 10,
	// 	created_at: 1730705800,
	// 	updated_at: 1730705830,
	// 	min_quantity: 2,
	// 	max_quantity: 50,
	// 	description: 'Kem chống nắng vật lý lai hóa học',
	// 	note: 'Hàng chính hãng',
	// 	manufacturer: 'Anessa',
	// 	made_in: 'Nhật Bản',
	// 	deleted_at: null,
	// 	deleted_by: null,
	// 	avg_original_price: 190000,
	// 	default_image:
	// 		'https://cdn.example.com/images/anessa-perfect-uv-sunscreen-skincare-milk-60ml.jpg',
	// 	productUnit: {
	// 		id: 675385,
	// 		product_id: 579481,
	// 		name: 'Tuýp',
	// 		value: 1,
	// 		sell_price: 250000,
	// 		no: 'SP003',
	// 		is_base: 1,
	// 		original_price: 200000,
	// 		quantity_of_stock: 20,
	// 		latest_parcel_no: 'LOT002',
	// 		latest_parcel_exp_date: '2025-06-30',
	// 		avg_original_price: 200000,
	// 	},
	// 	quantity: {
	// 		id: 561238,
	// 		store_id: 4787,
	// 		branch_id: 4780,
	// 		product_id: 579481,
	// 		number: 20,
	// 	},
	// },
	// {
	// 	store_id: 4787,
	// 	id: 579482,
	// 	product_type: 'merchandise',
	// 	medicine_id: null,
	// 	barcode: '4901872465835',
	// 	product_no: 'SP004',
	// 	product_name: 'Nước Tẩy Trang Senka All Clear Water Micellar Formula White 230ml',
	// 	shortcut: 'Tẩy Trang Senka',
	// 	original_price: 70000,
	// 	sell_price: 90000,
	// 	weight: 250,
	// 	quantity_of_stock: 30,
	// 	group_id: 1,
	// 	using_id: -1,
	// 	base_unit: 'Chai',
	// 	status: 10,
	// 	created_at: 1730705860,
	// 	updated_at: 1730705890,
	// 	min_quantity: 3,
	// 	max_quantity: 60,
	// 	description: 'Nước tẩy trang dịu nhẹ, làm sạch sâu',
	// 	note: null,
	// 	manufacturer: 'Senka',
	// 	made_in: 'Nhật Bản',
	// 	deleted_at: null,
	// 	deleted_by: null,
	// 	avg_original_price: 65000,
	// 	default_image:
	// 		'https://cdn.example.com/images/senka-all-clear-water-micellar-formula-white-230ml.jpg',
	// 	productUnit: {
	// 		id: 675386,
	// 		product_id: 579482,
	// 		name: 'Chai',
	// 		value: 1,
	// 		sell_price: 90000,
	// 		no: 'SP004',
	// 		is_base: 1,
	// 		original_price: 70000,
	// 		quantity_of_stock: 30,
	// 		latest_parcel_no: 'LOT003',
	// 		latest_parcel_exp_date: '2024-12-31',
	// 		avg_original_price: 70000,
	// 	},
	// 	quantity: {
	// 		id: 561239,
	// 		store_id: 4787,
	// 		branch_id: 4780,
	// 		product_id: 579482,
	// 		number: 30,
	// 	},
	// },
	// {
	// 	store_id: 4787,
	// 	id: 579483,
	// 	product_type: 'merchandise',
	// 	medicine_id: null,
	// 	barcode: '8935212800100',
	// 	product_no: 'SP005',
	// 	product_name: 'Dầu Gội Sunsilk Mềm Mượt Diệu Kỳ 640g',
	// 	shortcut: 'Dầu Gội Sunsilk',
	// 	original_price: 55000,
	// 	sell_price: 70000,
	// 	weight: 700,
	// 	quantity_of_stock: 25,
	// 	group_id: 2,
	// 	using_id: -1,
	// 	base_unit: 'Chai',
	// 	status: 10,
	// 	created_at: 1730705920,
	// 	updated_at: 1730705950,
	// 	min_quantity: 4,
	// 	max_quantity: 80,
	// 	description: 'Dầu gội giúp tóc mềm mượt, óng ả',
	// 	note: null,
	// 	manufacturer: 'Sunsilk',
	// 	made_in: 'Việt Nam',
	// 	deleted_at: null,
	// 	deleted_by: null,
	// 	avg_original_price: 52000,
	// 	default_image:
	// 		'https://cdn.example.com/images/sunsilk-mem-muot-dieu-ky-640g.jpg',
	// 	productUnit: {
	// 		id: 675387,
	// 		product_id: 579483,
	// 		name: 'Chai',
	// 		value: 1,
	// 		sell_price: 70000,
	// 		no: 'SP005',
	// 		is_base: 1,
	// 		original_price: 55000,
	// 		quantity_of_stock: 25,
	// 		latest_parcel_no: 'LOT004',
	// 		latest_parcel_exp_date: '2024-06-30',
	// 		avg_original_price: 55000,
	// 	},
	// 	quantity: {
	// 		id: 561240,
	// 		store_id: 4787,
	// 		branch_id: 4780,
	// 		product_id: 579483,
	// 		number: 25,
	// 	},
	// },
	// {
	// 	store_id: 4787,
	// 	id: 579484,
	// 	product_type: 'merchandise',
	// 	medicine_id: null,
	// 	barcode: '8935004104016',
	// 	product_no: 'SP006',
	// 	product_name: 'Sữa Tắm Lifebuoy Bảo Vệ Vượt Trội 850g',
	// 	shortcut: 'Sữa Tắm Lifebuoy',
	// 	original_price: 65000,
	// 	sell_price: 80000,
	// 	weight: 900,
	// 	quantity_of_stock: 35,
	// 	group_id: 2,
	// 	using_id: -1,
	// 	base_unit: 'Chai',
	// 	status: 10,
	// 	created_at: 1730705980,
	// 	updated_at: 1730706010,
	// 	min_quantity: 3,
	// 	max_quantity: 70,
	// 	description: 'Sữa tắm diệt khuẩn, bảo vệ da',
	// 	note: null,
	// 	manufacturer: 'Lifebuoy',
	// 	made_in: 'Việt Nam',
	// 	deleted_at: null,
	// 	deleted_by: null,
	// 	avg_original_price: 62000,
	// 	default_image:
	// 		'https://cdn.example.com/images/lifebuoy-bao-ve-vuot-troi-850g.jpg',
	// 	productUnit: {
	// 		id: 675388,
	// 		product_id: 579484,
	// 		name: 'Chai',
	// 		value: 1,
	// 		sell_price: 80000,
	// 		no: 'SP006',
	// 		is_base: 1,
	// 		original_price: 65000,
	// 		quantity_of_stock: 35,
	// 		latest_parcel_no: 'LOT005',
	// 		latest_parcel_exp_date: '2024-09-30',
	// 		avg_original_price: 65000,
	// 	},
	// 	quantity: {
	// 		id: 561241,
	// 		store_id: 4787,
	// 		branch_id: 4780,
	// 		product_id: 579484,
	// 		number: 35,
	// 	},
	// },
	// {
	// 	store_id: 4787,
	// 	id: 579485,
	// 	product_type: 'merchandise',
	// 	medicine_id: null,
	// 	barcode: '8936086960023',
	// 	product_no: 'SP007',
	// 	product_name: 'Viên Uống DHC Vitamin C 60 Ngày',
	// 	shortcut: 'DHC Vitamin C',
	// 	original_price: 120000,
	// 	sell_price: 150000,
	// 	weight: 50,
	// 	quantity_of_stock: 40,
	// 	group_id: 3,
	// 	using_id: -1,
	// 	base_unit: 'Gói',
	// 	status: 10,
	// 	created_at: 1730706040,
	// 	updated_at: 1730706070,
	// 	min_quantity: 5,
	// 	max_quantity: 100,
	// 	description: 'Bổ sung Vitamin C, tăng cường sức đề kháng',
	// 	note: 'Hàng nội địa Nhật',
	// 	manufacturer: 'DHC',
	// 	made_in: 'Nhật Bản',
	// 	deleted_at: null,
	// 	deleted_by: null,
	// 	avg_original_price: 115000,
	// 	default_image:
	// 		'https://cdn.example.com/images/dhc-vitamin-c-60-ngay.jpg',
	// 	productUnit: {
	// 		id: 675389,
	// 		product_id: 579485,
	// 		name: 'Gói',
	// 		value: 1,
	// 		sell_price: 150000,
	// 		no: 'SP007',
	// 		is_base: 1,
	// 		original_price: 120000,
	// 		quantity_of_stock: 40,
	// 		latest_parcel_no: 'LOT006',
	// 		latest_parcel_exp_date: '2025-03-31',
	// 		avg_original_price: 120000,
	// 	},
	// 	quantity: {
	// 		id: 561242,
	// 		store_id: 4787,
	// 		branch_id: 4780,
	// 		product_id: 579485,
	// 		number: 40,
	// 	},
	// },
	// {
	// 	store_id: 4787,
	// 	id: 579486,
	// 	product_type: 'merchandise',
	// 	medicine_id: null,
	// 	barcode: '4902430678402',
	// 	product_no: 'SP008',
	// 	product_name: 'Bột Giặt Ariel Hương Nắng Mai 4.1kg',
	// 	shortcut: 'Ariel Hương Nắng Mai',
	// 	original_price: 95000,
	// 	sell_price: 120000,
	// 	weight: 4200,
	// 	quantity_of_stock: 15,
	// 	group_id: 4,
	// 	using_id: -1,
	// 	base_unit: 'Túi',
	// 	status: 10,
	// 	created_at: 1730706100,
	// 	updated_at: 1730706130,
	// 	min_quantity: 1,
	// 	max_quantity: 30,
	// 	description: 'Bột giặt sạch nhanh, thơm lâu',
	// 	note: null,
	// 	manufacturer: 'Ariel',
	// 	made_in: 'Việt Nam',
	// 	deleted_at: null,
	// 	deleted_by: null,
	// 	avg_original_price: 90000,
	// 	default_image:
	// 		'https://cdn.example.com/images/ariel-huong-nang-mai-4.1kg.jpg',
	// 	productUnit: {
	// 		id: 675390,
	// 		product_id: 579486,
	// 		name: 'Túi',
	// 		value: 1,
	// 		sell_price: 120000,
	// 		no: 'SP008',
	// 		is_base: 1,
	// 		original_price: 95000,
	// 		quantity_of_stock: 15,
	// 		latest_parcel_no: 'LOT007',
	// 		latest_parcel_exp_date: '2024-12-31',
	// 		avg_original_price: 95000,
	// 	},
	// 	quantity: {
	// 		id: 561243,
	// 		store_id: 4787,
	// 		branch_id: 4780,
	// 		product_id: 579486,
	// 		number: 15,
	// 	},
	// },
	// {
	// 	store_id: 4787,
	// 	id: 579487,
	// 	product_type: 'merchandise',
	// 	medicine_id: null,
	// 	barcode: '8934588902058',
	// 	product_no: 'SP009',
	// 	product_name: 'Nước Xả Vải Downy Đam Mê 3L',
	// 	shortcut: 'Downy Đam Mê',
	// 	original_price: 130000,
	// 	sell_price: 160000,
	// 	weight: 3100,
	// 	quantity_of_stock: 20,
	// 	group_id: 4,
	// 	using_id: -1,
	// 	base_unit: 'Túi',
	// 	status: 10,
	// 	created_at: 1730706160,
	// 	updated_at: 1730706190,
	// 	min_quantity: 2,
	// 	max_quantity: 40,
	// 	description: 'Nước xả vải thơm lâu, mềm vải',
	// 	note: null,
	// 	manufacturer: 'Downy',
	// 	made_in: 'Việt Nam',
	// 	deleted_at: null,
	// 	deleted_by: null,
	// 	avg_original_price: 125000,
	// 	default_image:
	// 		'https://cdn.example.com/images/downy-dam-me-3l.jpg',
	// 	productUnit: {
	// 		id: 675391,
	// 		product_id: 579487,
	// 		name: 'Túi',
	// 		value: 1,
	// 		sell_price: 160000,
	// 		no: 'SP009',
	// 		is_base: 1,
	// 		original_price: 130000,
	// 		quantity_of_stock: 20,
	// 		latest_parcel_no: 'LOT008',
	// 		latest_parcel_exp_date: '2024-06-30',
	// 		avg_original_price: 130000,
	// 	},
	// 	quantity: {
	// 		id: 561244,
	// 		store_id: 4787,
	// 		branch_id: 4780,
	// 		product_id: 579487,
	// 		number: 20,
	// 	},
	// },
	// {
	// 	store_id: 4787,
	// 	id: 579488,
	// 	product_type: 'merchandise',
	// 	medicine_id: null,
	// 	barcode: '8936014110171',
	// 	product_no: 'SP010',
	// 	product_name: 'Nước Rửa Chén Sunlight Chanh 3.8kg',
	// 	shortcut: 'Sunlight Chanh',
	// 	original_price: 75000,
	// 	sell_price: 95000,
	// 	weight: 4000,
	// 	quantity_of_stock: 18,
	// 	group_id: 4,
	// 	using_id: -1,
	// 	base_unit: 'Chai',
	// 	status: 10,
	// 	created_at: 1730706220,
	// 	updated_at: 1730706250,
	// 	min_quantity: 1,
	// 	max_quantity: 36,
	// 	description: 'Nước rửa chén sạch dầu mỡ, hương chanh',
	// 	note: null,
	// 	manufacturer: 'Sunlight',
	// 	made_in: 'Việt Nam',
	// 	deleted_at: null,
	// 	deleted_by: null,
	// 	avg_original_price: 70000,
	// 	default_image:
	// 		'https://cdn.example.com/images/sunlight-chanh-3.8kg.jpg',
	// 	productUnit: {
	// 		id: 675392,
	// 		product_id: 579488,
	// 		name: 'Chai',
	// 		value: 1,
	// 		sell_price: 95000,
	// 		no: 'SP010',
	// 		is_base: 1,
	// 		original_price: 75000,
	// 		quantity_of_stock: 18,
	// 		latest_parcel_no: 'LOT009',
	// 		latest_parcel_exp_date: '2024-03-31',
	// 		avg_original_price: 75000,
	// 	},
	// 	quantity: {
	// 		id: 561245,
	// 		store_id: 4787,
	// 		branch_id: 4780,
	// 		product_id: 579488,
	// 		number: 18,
	// 	},
	// },
	// {
	// 	store_id: 4787,
	// 	id: 579489,
	// 	product_type: 'merchandise',
	// 	medicine_id: null,
	// 	barcode: '8934683012340',
	// 	product_no: 'SP011',
	// 	product_name: 'Giấy Vệ Sinh Pulppy 2 Lớp 10 Cuộn',
	// 	shortcut: 'Giấy VS Pulppy',
	// 	original_price: 40000,
	// 	sell_price: 50000,
	// 	weight: 500,
	// 	quantity_of_stock: 30,
	// 	group_id: 4,
	// 	using_id: -1,
	// 	base_unit: 'Gói',
	// 	status: 10,
	// 	created_at: 1730706280,
	// 	updated_at: 1730706310,
	// 	min_quantity: 5,
	// 	max_quantity: 100,
	// 	description: 'Giấy vệ sinh mềm mại, dai',
	// 	note: null,
	// 	manufacturer: 'Pulppy',
	// 	made_in: 'Việt Nam',
	// 	deleted_at: null,
	// 	deleted_by: null,
	// 	avg_original_price: 38000,
	// 	default_image:
	// 		'https://cdn.example.com/images/pulppy-2-lop-10-cuon.jpg',
	// 	productUnit: {
	// 		id: 675393,
	// 		product_id: 579489,
	// 		name: 'Gói',
	// 		value: 1,
	// 		sell_price: 50000,
	// 		no: 'SP011',
	// 		is_base: 1,
	// 		original_price: 40000,
	// 		quantity_of_stock: 30,
	// 		latest_parcel_no: 'LOT010',
	// 		latest_parcel_exp_date: '2025-12-31',
	// 		avg_original_price: 40000,
	// 	},
	// 	quantity: {
	// 		id: 561246,
	// 		store_id: 4787,
	// 		branch_id: 4780,
	// 		product_id: 579489,
	// 		number: 30,
	// 	},
	// },
	// {
	// 	store_id: 4787,
	// 	id: 579490,
	// 	product_type: 'merchandise',
	// 	medicine_id: null,
	// 	barcode: '8935254100017',
	// 	product_no: 'SP012',
	// 	product_name: 'Nước Lau Sàn Gift Hương Hoa Thiên Nhiên 3.8kg',
	// 	shortcut: 'Gift Hương Hoa',
	// 	original_price: 60000,
	// 	sell_price: 75000,
	// 	weight: 4000,
	// 	quantity_of_stock: 22,
	// 	group_id: 4,
	// 	using_id: -1,
	// 	base_unit: 'Chai',
	// 	status: 10,
	// 	created_at: 1730706340,
	// 	updated_at: 1730706370,
	// 	min_quantity: 2,
	// 	max_quantity: 44,
	// 	description: 'Nước lau sàn sạch bóng, thơm ngát',
	// 	note: null,
	// 	manufacturer: 'Gift',
	// 	made_in: 'Việt Nam',
	// 	deleted_at: null,
	// 	deleted_by: null,
	// 	avg_original_price: 58000,
	// 	default_image:
	// 		'https://cdn.example.com/images/gift-huong-hoa-thien-nhien-3.8kg.jpg',
	// 	productUnit: {
	// 		id: 675394,
	// 		product_id: 579490,
	// 		name: 'Chai',
	// 		value: 1,
	// 		sell_price: 75000,
	// 		no: 'SP012',
	// 		is_base: 1,
	// 		original_price: 60000,
	// 		quantity_of_stock: 22,
	// 		latest_parcel_no: 'LOT011',
	// 		latest_parcel_exp_date: '2024-09-30',
	// 		avg_original_price: 60000,
	// 	},
	// 	quantity: {
	// 		id: 561247,
	// 		store_id: 4787,
	// 		branch_id: 4780,
	// 		product_id: 579490,
	// 		number: 22,
	// 	},
	// },
	// {
	// 	store_id: 4787,
	// 	id: 579491,
	// 	product_type: 'merchandise',
	// 	medicine_id: null,
	// 	barcode: '8935049500406',
	// 	product_no: 'SP013',
	// 	product_name: 'Nước Giặt Omo Matic Cửa Trên 2.7kg',
	// 	shortcut: 'Omo Matic Cửa Trên',
	// 	original_price: 100000,
	// 	sell_price: 130000,
	// 	weight: 2800,
	// 	quantity_of_stock: 16,
	// 	group_id: 4,
	// 	using_id: -1,
	// 	base_unit: 'Túi',
	// 	status: 10,
	// 	created_at: 1730706400,
	// 	updated_at: 1730706430,
	// 	min_quantity: 1,
	// 	max_quantity: 32,
	// 	description: 'Nước giặt chuyên dụng cho máy giặt cửa trên',
	// 	note: null,
	// 	manufacturer: 'Omo',
	// 	made_in: 'Việt Nam',
	// 	deleted_at: null,
	// 	deleted_by: null,
	// 	avg_original_price: 95000,
	// 	default_image:
	// 		'https://cdn.example.com/images/omo-matic-cua-tren-2.7kg.jpg',
	// 	productUnit: {
	// 		id: 675395,
	// 		product_id: 579491,
	// 		name: 'Túi',
	// 		value: 1,
	// 		sell_price: 130000,
	// 		no: 'SP013',
	// 		is_base: 1,
	// 		original_price: 100000,
	// 		quantity_of_stock: 16,
	// 		latest_parcel_no: 'LOT012',
	// 		latest_parcel_exp_date: '2024-12-31',
	// 		avg_original_price: 100000,
	// 	},
	// 	quantity: {
	// 		id: 561248,
	// 		store_id: 4787,
	// 		branch_id: 4780,
	// 		product_id: 579491,
	// 		number: 16,
	// 	},
	// },
	// {
	// 	store_id: 4787,
	// 	id: 579492,
	// 	product_type: 'merchandise',
	// 	medicine_id: null,
	// 	barcode: '8936035850230',
	// 	product_no: 'SP014',
	// 	product_name: 'Bàn Chải Đánh Răng P/S Lông Tơ Mềm Mại',
	// 	shortcut: 'Bàn Chải P/S',
	// 	original_price: 15000,
	// 	sell_price: 20000,
	// 	weight: 50,
	// 	quantity_of_stock: 50,
	// 	group_id: 5,
	// 	using_id: -1,
	// 	base_unit: 'Cây',
	// 	status: 10,
	// 	created_at: 1730706460,
	// 	updated_at: 1730706490,
	// 	min_quantity: 10,
	// 	max_quantity: 200,
	// 	description: 'Bàn chải đánh răng lông tơ mềm mại, sạch sâu',
	// 	note: null,
	// 	manufacturer: 'P/S',
	// 	made_in: 'Việt Nam',
	// 	deleted_at: null,
	// 	deleted_by: null,
	// 	avg_original_price: 14000,
	// 	default_image:
	// 		'https://cdn.example.com/images/ps-long-to-mem-mai.jpg',
	// 	productUnit: {
	// 		id: 675396,
	// 		product_id: 579492,
	// 		name: 'Cây',
	// 		value: 1,
	// 		sell_price: 20000,
	// 		no: 'SP014',
	// 		is_base: 1,
	// 		original_price: 15000,
	// 		quantity_of_stock: 50,
	// 		latest_parcel_no: 'LOT013',
	// 		latest_parcel_exp_date: '2025-06-30',
	// 		avg_original_price: 15000,
	// 	},
	// 	quantity: {
	// 		id: 561249,
	// 		store_id: 4787,
	// 		branch_id: 4780,
	// 		product_id: 57949,
	// 		number: 50,
	// 	},
	// }
];
