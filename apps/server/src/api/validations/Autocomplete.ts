import { z } from 'zod';

export class AutocompleteValidation {
		public static queryProduct = z.object({
			query: z.string().nonempty(),
			limit: z.string().refine((val) => {
				const limit = Number(val);
				return !isNaN(limit) && limit > 0;
			})
		});
		public static queryRegion = z.object({
			query: z.string().nonempty(),
			group: z.enum(['tinh', 'huyen', 'xa'])
		});
		public static queryRegionAll = z.object({
			group: z.enum(['tinh', 'huyen', 'xa']),
			target: z.string().optional()
		})
}

export type QueryProduct = z.infer<typeof AutocompleteValidation.queryProduct>;
export type QueryRegion = z.infer<typeof AutocompleteValidation.queryRegion>;
export type QueryRegionAll = z.infer<typeof AutocompleteValidation.queryRegionAll>;