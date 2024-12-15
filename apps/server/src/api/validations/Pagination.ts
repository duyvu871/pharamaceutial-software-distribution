import { validateNumber } from 'utils/number';
import { z } from 'zod';

export class PaginationValidation {
	public static paginationQuery = z.object({
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
}