import { SuccessResponse } from '@type/api/response.ts';
import axiosWithAuth from '@lib/axios.ts';
import { Provider } from '@schema/provider-schema.ts';

export async function getProviders(
	filter: {
		branchId: string;
		page: number;
		perPage: number;
		limit: number;
		search?: string;
	},
	isMock?: boolean,)
{
	try {
		const response = await axiosWithAuth.get<SuccessResponse<Provider[]>>(`/product/${filter.branchId}`, {
			params: {
				page: filter.page,
				perPage: filter.perPage,
				limit: filter.limit,
				search: filter.search,
			},
		});

		return response.data.data;
	} catch (error: any) {
		return [];
	}
}