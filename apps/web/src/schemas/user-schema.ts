import { z } from 'zod';
import { Branch, branchSchema } from '@schema/branch-schema.ts';
import { phoneRegex } from '@util/validator.ts';

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
// register schema for validation in register form
export const registerSchema = z.object({
	phone: z.string()
		.min(10, { message: 'Phone number is too short' })
		.max(11, { message: 'Phone number is too long' })
		.regex(/((09|03|07|08|05)+([0-9]{8})\b)/g, { message: 'Phone number is invalid' }),
	username: z.string().min(3, { message: 'Username is too short' }),
	email: z.string().email(),
	password: z
		.string()
		.min(8, { message: 'Password is too short' })
		.max(20, { message: 'Password is too long' }),
	confirmPassword: z.string(),
}).refine(data => data.password === data.confirmPassword, {
	message: 'Passwords do not match',
	path: ['confirmPassword'],
});
export type RegisterPayloadType = z.infer<typeof registerSchema>;


export const profileSchema = z.object({
	id: z.string(),
	phone_number: z.string()
		.min(10, { message: 'Phone number is too short' })
		.max(11, { message: 'Phone number is too long' })
		.regex(/((09|03|07|08|05)+([0-9]{8})\b)/g, { message: 'Phone number is invalid' }),
	username: z.string().min(3, { message: 'Tên người dùng quá ngắn' }),
	email: z.string().email(),
	age: z.number().positive('Tuổi phải lớn hơn 0'),
	address: z.string({
		message: 'Địa chỉ không được để trống',
		invalid_type_error: 'Địa chỉ không hợp lệ',
	}),
	avatar: z.string(),
	notes: z.string({
		message: 'Ghi chú không được để trống',
		invalid_type_error: 'Ghi chú không hợp lệ',
	}).optional(),
	is_active: z.boolean(),
	last_login: z.string(),
	permission: z.array(z.string()),
	branches: z.array(branchSchema),
});

export type ProfilePayloadType = z.infer<typeof profileSchema>;

export const authSessionInfoSchema = z.object({
	id: z.string(),
	username: z.string(),
	role: z.enum(['admin', 'user', 'membership']),
	avatar: z.string(),
	phone_number: z.string(),
	email: z.string(),
});

export type AuthSessionInfo = z.infer<typeof authSessionInfoSchema>;

export const userSettingSchema = z.object({
	email: z.string().email().nullable().optional(),
	phone_number: z.string()
		.min(10, { message: 'Phone number is too short' })
		.max(11, { message: 'Phone number is too long' })
		.regex(phoneRegex, { message: 'Phone number is invalid' }).nullable(),
	username: z.string().min(3, { message: 'Username is too short' }).nullable(),
	avatar: z.string().nullable().optional(),
	age: z.number().positive('Age must be greater than 0').nullable().optional(),
	address: z.string().nullable().optional(),
	password: z.string().min(8, { message: 'Password is too short' }).nullable().optional(),
}).partial();

export type UserSettingPayloadType = z.infer<typeof userSettingSchema>;