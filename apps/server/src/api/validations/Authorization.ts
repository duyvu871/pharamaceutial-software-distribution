import { z } from 'zod';

export class AuthorizationValidation {
	public static login = z.object({
		type: z.enum(['user', 'admin', 'membership'], {
			invalid_type_error: 'Loại tài khoản không hợp lệ'
		}),
		username: z.string().min(3, { message: 'Tên đăng nhập phải có ít nhất 3 ký tự' }),
		password: z.string().min(6, { message: 'Mật khẩu phải có ít nhất 6 ký tự' })
	});

	public static register = z.object({
		username: z.string().min(3, { message: 'Tên đăng nhập phải có ít nhất 3 ký tự' }),
		password: z.string().min(6, { message: 'Mật khẩu phải có ít nhất 6 ký tự' }),
		email: z.string().email({ message: 'Email không hợp lệ' }),
		age: z.number().int().positive({ message: 'Tuổi phải là số nguyên dương' }),
		phone_number: z.string().min(10, { message: 'Số điện thoại phải có ít nhất 10 ký tự' })
	});

	public static refreshToken = z.object({
		refreshToken: z.string().min(10, { message: 'Refresh token không hợp lệ' }),
		userId: z.string().min(10, { message: 'User ID không hợp lệ' })
	});

	public static verifySession = z.object({
		authorization: z.string().min(10, { message: 'Authorization không hợp lệ' })
	});

	public static headers = z.object({
		authorization: z
			.string({
				required_error: 'Authorization header is required',
				invalid_type_error: 'Invalid authorization header',
			})
			.startsWith('Bearer ', 'Authorization header must start with "Bearer "'),
	});
}

export type LoginBody = z.infer<typeof AuthorizationValidation.login>;
export type RegisterBody = z.infer<typeof AuthorizationValidation.register>;
export type RefreshTokenBody = z.infer<typeof AuthorizationValidation.refreshToken>;
export type VerifySessionBody = z.infer<typeof AuthorizationValidation.verifySession>;
export type Headers = z.infer<typeof AuthorizationValidation.headers>;