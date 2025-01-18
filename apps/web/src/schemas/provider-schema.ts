import { z } from "zod"

export type Provider = {
	companyName: string
	phoneNumber: string | null
	email: string | null
	taxCode: string | null
	address: string | null
	city: string | null
	district: string | null
	wards: string | null
	note: string | null
	storeId: string
	createdAt: string | null
	updatedAt: string | null
	id: string
}

export const CreateProviderSchema = z.object({
	companyName: z.string({ required_error: "Tên công ty là bắt buộc" }).min(1, { message: "Tên công ty không được để trống" }),
	phoneNumber: z.string({ required_error: "Số điện thoại là bắt buộc" }).min(1, { message: "Số điện thoại không được để trống" }),
	email: z.string().email("Email không hợp lệ").optional().nullable(),
	taxCode: z.string().optional().nullable(),
	address: z.string().optional().nullable(),
	city: z.string({ required_error: "Thành phố là bắt buộc" }).min(1, { message: "Thành phố không được để trống" }),
	district: z.string({ required_error: "Quận/huyện là bắt buộc" }).min(1, { message: "Quận/huyện không được để trống" }),
	wards: z.string({ required_error: "Xã/phường là bắt buộc" }).min(1, { message: "Xã/phường không được để trống" }),
	note: z.string().optional().nullable(),
	storeId: z.string().uuid({ message: "ID cửa hàng không hợp lệ" }),
});

export type CreateProviderType = z.infer<typeof CreateProviderSchema>;

export const UpdateProviderSchema = z.object({
	companyName: z.string().min(1, { message: "Tên công ty không được để trống" }).optional(),
	phoneNumber: z.string().min(1, { message: "Số điện thoại không được để trống" }).optional(),
	email: z.string().email("Email không hợp lệ").optional().nullable(),
	taxCode: z.string().optional().nullable(),
	address: z.string().optional().nullable(),
	city: z.string().min(1, { message: "Thành phố không được để trống" }).optional(),
	district: z.string().min(1, { message: "Quận/huyện không được để trống" }).optional(),
	wards: z.string().min(1, { message: "Xã/phường không được để trống" }).optional(),
	note: z.string().optional().nullable(),
	storeId: z.string().uuid({ message: "ID cửa hàng không hợp lệ" }).optional(),
}).partial(); // Sử dụng .partial() để làm cho tất cả các trường đều không bắt buộc

export type UpdateProviderType = z.infer<typeof UpdateProviderSchema>;