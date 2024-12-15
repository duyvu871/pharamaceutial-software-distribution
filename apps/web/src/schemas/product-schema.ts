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
	store_id: z.number(),
	id: z.number(),
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