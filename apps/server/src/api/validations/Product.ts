import { z } from 'zod';
import { validateNumber } from 'utils/number';

export class ProductValidation {
	public static getProductQuery = z.object({
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
	})
}

export type ProductQuery = z.infer<typeof ProductValidation.getProductQuery>;