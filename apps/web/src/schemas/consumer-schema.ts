import { z } from 'zod';

export const ConsumerZodSchema = z.object({
	consumer_name: z.string({
		required_error: 'Tên khách hàng không được để trống',
		invalid_type_error: 'Tên khách hàng phải là chuỗi'
	}).min(3, { message: 'Tên khách hàng phải có ít nhất 3 ký tự' }),
	gender: z.enum(['male', 'female'], {
		required_error: 'Giới tính là bắt buộc',
		invalid_type_error: 'Giới tính phải là male hoặc female'
	}).nullable(),
	consumer_email: z.string({
		invalid_type_error: 'Email phải là chuỗi'
	}).email({ message: 'Email không hợp lệ' }).nullable(),
	phone_number: z.string({
		required_error: 'Số điện thoại không được để trống',
		invalid_type_error: 'Số điện thoại phải là chuỗi'
	})
		.min(10, { message: 'Số điện thoại quá ngắn' })
		.max(11, { message: 'Số điện thoại quá dài' })
		.regex(/((09|03|07|08|05)+([0-9]{8})\b)/g, { message: 'Số điện thoại không hợp lệ' }),
	tax_code: z.string().nullable(),
	company_name: z.string().nullable(),
	date_of_birth: z.date().nullable(),
	facebook: z.string().nullable(),
	address: z.string().nullable(),
	notes: z.string().nullable(),
	province_city: z.string().nullable(),
	district: z.string().nullable(),
	ward: z.string().nullable(),

});

export const ConsumerSchema = ConsumerZodSchema.extend({
	id: z.string(),
	revenue: z.number().default(0),
	debit: z.number().default(0),

	branch_id: z.string(),

	createdAt: z.date(),
	updatedAt: z.date().nullable(),
});

export type ConsumerAttributes = z.infer<typeof ConsumerSchema>;
export type ConsumerCreationAttributes = z.infer<typeof ConsumerZodSchema>;