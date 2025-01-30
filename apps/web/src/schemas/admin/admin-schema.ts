import {admin_permissions, admin_subsciption, admin_to_user, enum_gender, roles} from '@prisma/client';

import { z } from 'zod';
import { Prisma } from '@repo/orm';
import { phoneRegex } from '@util/validator.ts';
import { branchDetailsSchema, branchIntegrationSchema } from '@schema/branch-schema.ts';

export type AdminSchema = {}


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

export const adminSchema = z.object({
	id: z.string().optional(),
	username: z
		.string()
		.nonempty({ message: 'Tên tài khoản không được để trống' })
		.min(2, { message: 'Tên tài khoản phải có ít nhất 2 ký tự' }),
	password: z
		.string()
		.nonempty({ message: 'Mật khẩu không được để trống' })
		.min(6, { message: 'Mật khẩu phải có ít nhất 6 ký tự' }),
	first_name: z.string().optional(),
	last_name: z.string().optional(),
	address: z.string().optional(),
	postal_code: z.string().optional(),
	dob: z.string().optional(),
	phone_number: z.string().optional(),
	email: z.string().optional(),
	gender: z.enum(['male', 'female', 'other']).optional(),
});

export type AdminCreateSchema = z.infer<typeof adminSchema>;

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


export type AdminType = {
	id: string;
	username: string;
	last_name: string;
	first_name: string;
	gender: enum_gender;
	password: string;
	email: string | null;
	phone_number: string | null;
	postal_code: string | null;
	address: string | null;
	avatar: string | null;
	notes: string | null;
	bio: string | null;
	dob: string | null;
	is_active: boolean;
	last_login: string | null;
	reset_token: string | null;
	permission: string[];
	roleId: string | null;
	createdAt: string | null;
	updatedAt: string | null;
	roles: roles | null;
	admin_to_user: admin_to_user[];
	admin_subsciption: Prisma.admin_subsciptionGetPayload<{
		include: {
			admin_plans: true;
		}
	}>[];
	admin_permissions: admin_permissions[];
};

export const adminBranchCreationSchema = z.object({
	branch_id: z.string().optional(),
	user_id: z.string().optional(),
	branch_name: z.string({
		invalid_type_error: 'Tên chi nhánh không hợp lệ',
		required_error: 'Tên chi nhánh không được để trống'
	})
		.min(3, 'Tên chi nhánh phải có ít nhất 3 ký tự'),
	address: z.string({
		invalid_type_error: 'Địa chỉ không hợp lệ',
		required_error: 'Địa chỉ không được để trống'
	}),
	phone_number: z.string({
		invalid_type_error: 'Số điện thoại không hợp lệ',
		required_error: 'Số điện thoại không được để trống'
	})
		.min(10, 'Số điện thoại phải có ít nhất 10 ký tự')
		.max(12, 'Số điện thoại không được quá 12 ký tự')
		.regex(phoneRegex, 'Số điện thoại không hợp lệ'),
	branch_status: z.enum(['inactive', 'active']),
	branch_integration: branchIntegrationSchema.partial(),
	branch_details: branchDetailsSchema.partial()
})

export type AminBranchFormFieldCreation = z.infer<typeof adminBranchCreationSchema>;

