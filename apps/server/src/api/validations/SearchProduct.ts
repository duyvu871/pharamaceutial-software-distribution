import { z } from 'zod';

export class SearchProductValidation {
	public static SearchInput = z.object({
		name: z.string().min(2, { message: 'Nhập ít nhất 2 chữ' })
	});
}

export type SearchBody = z.infer<typeof SearchProductValidation.SearchInput>;
