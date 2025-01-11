import { validateNumber } from 'utils/number';
import { z } from 'zod';

export class PaginationValidation {
	public static paginationQuery = z.object({
		page: validateNumber("page", true).optional(),
		limit: validateNumber("limit", true).optional(),
		search: z.string().max(200, {
			message: 'Search query too long'
		}).optional(),
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