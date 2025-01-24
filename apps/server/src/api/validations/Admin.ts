import { z } from "zod";

export class AdminValidation {
	public static adminIdParam = z.object({
		adminId: z.string()
	});

	public static adminCreation = z.object({
		id: z.string().optional(),
		username: z
			.string()
			.nonempty({ message: 'Tên tài khoản không được để trống' })
			.min(2, { message: 'Tên tài khoản phải có ít nhất 2 ký tự' }),
		password: z
			.string()
			.nonempty({ message: 'Mật khẩu không được để trống' })
			.min(6, { message: 'Mật khẩu phải có ít nhất 6 ký tự' }),
		first_name: z.string({
			message: 'Tên không được để trống'
		}),
		last_name: z.string({
			message: 'Họ không được để trống'
		}),
		address: z.string({
			message: 'Địa chỉ không được để trống'
		}),
		postal_code: z.string({
			message: 'Mã bưu chính không được để trống'
		}),
		dob: z.string({
			message: 'Ngày sinh không được để trống'
		}).datetime({
			message: 'Ngày sinh không hợp lệ'
		}),
		phone_number: z.string({
			message: 'Số điện thoại không được để trống'
		}),
		email: z.string({
			message: 'Email không được để trống'
		}).email({
			message: 'Email không hợp lệ'
		}),
		gender: z.enum(['male', 'female', 'other']),
	})

	public static userCreation = z.object({
		id: z.string().optional(),
		username: z
			.string()
			.nonempty({ message: 'Tên tài khoản không được để trống' })
			.min(2, { message: 'Tên tài khoản phải có ít nhất 2 ký tự' }),
		password: z
			.string()
			.min(6, { message: 'Mật khẩu phải có ít nhất 6 ký tự' }).optional(),
		address: z.string().optional(),
		phone_number: z.string()
			.nonempty({ message: 'SDT không được để trống' })
			.min(10, { message: 'SDT phải có ít nhất 10 ký tự' }),
		email: z.string().email({ message: 'Email không hợp lệ' }).optional(),
		notes: z.string().optional(),
	});
}

export type AdminIdParam = z.infer<typeof AdminValidation.adminIdParam>;
export type AdminCreation = z.infer<typeof AdminValidation.adminCreation>;
export type UserCreation = z.infer<typeof AdminValidation.userCreation>;