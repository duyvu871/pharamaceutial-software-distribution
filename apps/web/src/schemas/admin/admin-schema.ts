
export type AdminSchema = {}

import { z } from 'zod';

export const StoreSchema = z.object({
	username: z
		.string()
		.nonempty({ message: 'Tên tài khoản không được để trống' })
		.min(2, { message: 'Tên tài khoản phải có ít nhất 2 ký tự' }),
	password: z
		.string()
		.nonempty({ message: 'Mật khẩu không được để trống' })
		.min(6, { message: 'Mật khẩu phải có ít nhất 6 ký tự' }),
	firstName: z.string().optional(),
	lastName: z.string().optional(),
	address: z.string().optional(),
	zipCode: z.string().optional(),
	dob: z
		.string()
		.optional()
	,
	phone: z.string()
		.nonempty({ message: 'SDT không được để trống' })
		.min(10, { message: 'SDT phải có ít nhất 10 ký tự' }),
	store:z.string()
		.nonempty({ message: 'Tên cửa hàng không được để trống' })
		.min(2, { message: 'Tên cửa hàng phải có ít nhất 2 ký'}),

	email: z
		.string()
		.optional(),
	gender: z.string().optional(),
});


export const UserSchema = z.object({
	username: z
		.string()
		.nonempty({ message: 'Tên tài khoản không được để trống' })
		.min(2, { message: 'Tên tài khoản phải có ít nhất 2 ký tự' }),
	password: z
		.string()
		.nonempty({ message: 'Mật khẩu không được để trống' })
		.min(6, { message: 'Mật khẩu phải có ít nhất 6 ký tự' }),
	firstName: z.string().optional(),
	lastName: z.string().optional(),
	address: z.string().optional(),
	zipCode: z.string().optional(),
	dob: z
		.string()
		.optional()
	,
	phone: z.string()
		.nonempty({ message: 'SDT không được để trống' })
		.min(10, { message: 'SDT phải có ít nhất 10 ký tự' }),
	store:z.string()
		.nonempty({ message: 'Tên cửa hàng không được để trống' })
		.min(2, { message: 'Tên cửa hàng phải có ít nhất 2 ký'}),
	User:z.string()
		.nonempty({ message: 'Tên cửa hàng không được để trống' })
		.min(2, { message: 'Tên cửa hàng phải có ít nhất 2 ký'}),

	email: z
		.string()
		.optional(),
	gender: z.string().optional(),
});

export const AdminSchema = z.object({
	username: z
		.string()
		.nonempty({ message: 'Tên tài khoản không được để trống' })
		.min(2, { message: 'Tên tài khoản phải có ít nhất 2 ký tự' }),
	password: z
		.string()
		.nonempty({ message: 'Mật khẩu không được để trống' })
		.min(6, { message: 'Mật khẩu phải có ít nhất 6 ký tự' }),
	firstName: z.string().optional(),
	lastName: z.string().optional(),
	address: z.string().optional(),
	zipCode: z.string().optional(),
	dob: z
		.string()
		.optional()
	,
	phone: z.string().optional(),
	email: z
		.string()
		.optional(),
	gender: z.string().optional(),
});

// login schema for validation in login form
export const loginSchema = z.object({
	role: z.enum(['admin', 'user', 'membership']),
	username: z.string().min(3, { message: 'Tên đăng nhập quá ngắn' }),
	password: z
		.string()
		.min(6, { message: 'Password is too short' })
		.max(20, { message: 'Password is too long' }),
});
export type LoginPayloadType = z.infer<typeof loginSchema>;
export type LoginFormType = LoginPayloadType;
