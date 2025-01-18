import { z } from 'zod';

export const ConsumerZodSchema = z.object({
	id: z.string().optional(),
	consumer_id: z.string().optional(),
	consumer_name: z.string({
		required_error: 'Tên khách hàng không được để trống',
		invalid_type_error: 'Tên khách hàng phải là chuỗi'
	}).min(3, { message: 'Tên khách hàng phải có ít nhất 3 ký tự' }),
	gender: z.enum(['male', 'female', 'other'], {
		required_error: 'Giới tính là bắt buộc',
		invalid_type_error: 'Giới tính phải là male hoặc female'
	}).optional(),
	consumer_email: z.string({
		invalid_type_error: 'Email phải là chuỗi'
	}).email({ message: 'Email không hợp lệ' }).optional(),
	phone_number: z.string({
		required_error: 'Số điện thoại không được để trống',
		invalid_type_error: 'Số điện thoại phải là chuỗi'
	})
		.min(10, { message: 'Số điện thoại quá ngắn' })
		.max(11, { message: 'Số điện thoại quá dài' })
		.regex(/((09|03|07|08|05)+([0-9]{8})\b)/g, { message: 'Số điện thoại không hợp lệ' }),
	tax_code: z.string().optional(),
	company_name: z.string().optional(),
	date_of_birth: z.string().optional(),
	facebook: z.string().optional(),
	address: z.string().optional(),
	notes: z.string().optional(),
	province_city: z.string().optional(),
	district: z.string().optional(),
	ward: z.string().optional(),

});

// export const ConsumerSchema = ConsumerZodSchema.extend({
// 	id: z.string(),
// 	revenue: z.number().default(0),
// 	debit: z.number().default(0),
//
// 	branch_id: z.string(),
//
// 	createdAt: z.date(),
// 	updatedAt: z.date().nullable(),
// });

export interface ConsumerAttributes {
	id: string
	branch_id: string
	consumer_id: string
	revenue: string
	debit: string
	consumer_name: string
	gender: "male"|"female"|"other"
	consumer_email: string
	phone_number: string
	tax_code: string
	company_name: string
	date_of_birth: string
	facebook: string
	address: string
	notes: string
	province_city: string
	district: string
	ward: string
	createdAt: string
	updatedAt: string
	point: number
}

// export type ConsumerAttributes = z.infer<typeof ConsumerSchema>;
export type ConsumerCreationAttributes = z.infer<typeof ConsumerZodSchema>;