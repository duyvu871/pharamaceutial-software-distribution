import { z } from "zod";
import { dateString } from '@util/validator.ts';

const vi = {
	name_is_required: "Tên là bắt buộc.",
	name_must_be_a_string: "Tên phải là chuỗi.",
	password_is_required: "Mật khẩu là bắt buộc.",
	please_enter_your_email_and_password: "Vui lòng nhập email và mật khẩu.",
	email_is_required: "Email là bắt buộc.",
	email_is_invalid: "Email không hợp lệ.",
	username_is_too_short: "Tên đăng nhập phải có ít nhất 3 ký tự.",
	password_is_too_short: "Mật khẩu phải có ít nhất 6 ký tự.",
	phone_number_is_too_short: "Số điện thoại phải có đúng 10 ký tự.",
	phone_number_is_too_long: "Số điện thoại phải có đúng 10 ký tự.",
};

export const membershipSchema = z.object({
	id: z.string().optional(),
	consumer_id: z.string().optional(),
	first_name: z
		.string({
			required_error: vi.name_is_required,
			invalid_type_error: vi.name_must_be_a_string,
		})
		.min(3, vi.username_is_too_short),
	last_name: z
		.string({
			required_error: vi.name_is_required,
			invalid_type_error: vi.name_must_be_a_string,
		})
		.min(3, vi.username_is_too_short),
	username: z
		.string({
			required_error: vi.name_is_required,
			invalid_type_error: vi.name_must_be_a_string,
		})
		.min(3, vi.username_is_too_short),
	password: z
		.string({
			required_error: vi.password_is_required,
			invalid_type_error: vi.please_enter_your_email_and_password,
		})
		.min(6, vi.password_is_too_short).optional(),
	email: z
		.string({
			required_error: vi.email_is_required,
			invalid_type_error: vi.please_enter_your_email_and_password,
		})
		.email(vi.email_is_invalid),
	phone_number: z
		.string({
			required_error: vi.name_is_required,
			invalid_type_error: vi.name_must_be_a_string,
		})
		.min(10, vi.phone_number_is_too_short)
		.max(10, vi.phone_number_is_too_long),
	hire_date: dateString,
	avatar: z.string().optional(),
	notes: z.string().optional(),
});

export type CreationMembershipSchema = z.infer<typeof membershipSchema>

export const payloadMembershipSchema = z.object({
	id: z.string(),
	consumer_id: z.string().optional(),
	first_name: z.string({
		required_error: vi.name_is_required,
		invalid_type_error: vi.name_must_be_a_string
	}).min(3),
	last_name: z.string({
		required_error: vi.name_is_required,
		invalid_type_error: vi.name_must_be_a_string
	}).min(3),
	username: z.string({
		required_error: vi.name_is_required,
		invalid_type_error: vi.name_must_be_a_string
	}).min(3),
	password: z.string({
		required_error: vi.password_is_required,
		invalid_type_error: vi.please_enter_your_email_and_password
	}).min(6),
	email: z.string({
		required_error: vi.email_is_required,
		invalid_type_error: vi.please_enter_your_email_and_password
	}).email(vi.email_is_invalid),
	phone_number: z.string().min(10).max(10),
	hire_date: dateString,
	avatar: z.string().optional(),
	notes: z.string().optional(),
	permission: z.array(z.string()).optional(),
	employee_status: z.enum(['active', 'inactive']),
	reset_token: z.string().optional(),
	branch_id: z.string(),

	createdAt: z.date(),
	updatedAt: z.date().optional()
})

export type PayloadMembershipSchema = z.infer<typeof payloadMembershipSchema>