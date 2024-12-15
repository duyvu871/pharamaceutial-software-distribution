import { z } from 'zod';
import { validateNumber } from 'utils/number';

export class ConsumerValidation {
	public static getConsumersQuery = z.object({
		page: validateNumber(true).optional(),
		limit: validateNumber(true).optional(),
		search: z.string().optional(),
		orderBy: z
			.string()
			.optional()
			.refine((orders) =>
				orders
					? orders
						.split(',')
						.every((order) =>
							['ASC', 'DESC'].includes(order.split(':')[1])
						)
					: false,
				{
					message: 'Invalid order value provided'
				}
			).innerType()
	});
	public static getConsumerParam = z.object({
		branchId: z.string().uuid()
	});

	public static createConsumer = z.object({
		consumer_name: z.string({
			required_error: 'Tên khách hàng không được để trống',
			invalid_type_error: 'Tên khách hàng phải là chuỗi'
		}).min(3, { message: 'Tên khách hàng phải có ít nhất 3 ký tự' }),
		gender: z.enum(['male', 'female'], {
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
		date_of_birth: z.string().refine(
			dateString => {
				const date = new Date(dateString);
				return date instanceof Date && !isNaN(date.getTime());
			}
		).optional(),
		facebook: z.string().optional(),
		address: z.string().optional(),
		notes: z.string().optional(),
		province_city: z.string().optional(),
		district: z.string().optional(),
		ward: z.string().optional(),
	});
}

export type GetConsumersQuery = z.infer<typeof ConsumerValidation.getConsumersQuery>;
export type GetConsumerParam = z.infer<typeof ConsumerValidation.getConsumerParam>;
export type CreateConsumer = z.infer<typeof ConsumerValidation.createConsumer>;