import { z } from 'zod';

export class UserValidation {
	public static profileQuery = z.object({
		id: z.string().min(10, { message: 'User ID is invalid' })
	});

	public static updateProfile = z.object({
		role: z.enum(['membership', 'user']),
		id: z.string().min(10, { message: 'User ID is invalid' }),
		profileUpdate: z.object({
			phone_number: z.string()
				.min(10, { message: 'Phone number is too short' })
				.max(11, { message: 'Phone number is too long' })
				.regex(/((09|03|07|08|05)+([0-9]{8})\b)/g, { message: 'Phone number is invalid' }).optional(),
			username: z.string().min(3, { message: 'Tên người dùng quá ngắn' }).optional(),
			email: z.string().email().optional(),
			age: z.number().int().positive('Tuổi phải lớn hơn 0').optional(),
			address: z.string({
				message: 'Địa chỉ không được để trống',
				invalid_type_error: 'Địa chỉ không hợp lệ',
			}).optional(),
			avatar: z.string().optional(),
			notes: z.string({
				message: 'Ghi chú không được để trống',
				invalid_type_error: 'Ghi chú không hợp lệ',
			}).optional(),
		})
	});

	public static resetPassword = z.object({
		id: z.string().min(10, { message: 'User ID is invalid' }),
		role: z.enum(['membership', 'user']),
		password: z.string().min(8, { message: 'Password is too short' }).max(20, { message: 'Password is too long' }),
		confirmPassword: z.string()
	}).refine(data => data.password === data.confirmPassword, {
		message: 'Passwords do not match',
		path: ['confirmPassword'],
	});
}

export type ProfileQuery = z.infer<typeof UserValidation.profileQuery>;
export type UpdateProfile = z.infer<typeof UserValidation.updateProfile>;
export type ResetPassword = z.infer<typeof UserValidation.resetPassword>;