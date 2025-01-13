import { z } from 'zod';

export class ProviderValidation {
	public static createProvider = z.object({
		companyName: z.string({ required_error: "Tên công ty là bắt buộc" }).min(1, { message: "Tên công ty không được để trống" }),
		phoneNumber: z.string({ required_error: "Số điện thoại là bắt buộc" }).min(1, { message: "Số điện thoại không được để trống" }),
		email: z.string().email("Email không hợp lệ").optional(),
		taxCode: z.string().optional(),
		address: z.string().optional(),
		city: z.string().optional(),
		district: z.string().optional(),
		wards: z.string().optional(),
		note: z.string().optional(),
		// storeId: z.string().uuid({ message: "ID cửa hàng không hợp lệ" }),
	});
}

export type CreateProvider = z.infer<typeof ProviderValidation.createProvider>;