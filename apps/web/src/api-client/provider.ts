import { SuccessResponse } from '@type/api/response.ts';
import axiosWithAuth from '@lib/axios.ts';
import { CreateProviderType, Provider } from '@schema/provider-schema.ts';

export async function getProviders(
	filter: {
		branchId: string;
		page: number;
		perPage: number;
		limit: number;
		search?: string;
		orderBy?: string;
	},
	isMock?: boolean,)
{
	try {
		const response = await axiosWithAuth.get<SuccessResponse<Provider[]>>(`/provider/${filter.branchId}`, {
			params: {
				page: filter.page,
				perPage: filter.perPage,
				limit: filter.limit,
				search: filter.search,
				orderBy: filter.orderBy || 'createdAt:DESC',
			},
		});

		return response.data.data;
	} catch (error: any) {
		return [];
	}
}

export async function upsertProvider(
	branchId: string,
	data: CreateProviderType & { id: string|null },
	isMock?: boolean,
)
{
	try {
		const response = await axiosWithAuth.post<SuccessResponse<Provider>>(`/provider/${branchId}`, data);

		return response.data.data;
	} catch (error: any) {
		console.log('error: ', error);
		throw new Error(error.response.data.errorDescription);
	}
}