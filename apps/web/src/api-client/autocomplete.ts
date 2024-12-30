import axiosWithAuth from '@lib/axios.ts';
import { SearchProductType, SearchRegionResponseType } from '@schema/autocomplete.ts';
import { SuccessResponse } from '@type/api/response.ts';
import { Product } from '@schema/product-schema.ts';

export const autocomplete = async (query: string, limit?: number): Promise<SearchProductType[]> => {
	try {
		const response = await axiosWithAuth.get<SuccessResponse<SearchProductType[]>>('/autocomplete/product', {
			params: {
				query,
				limit: limit || 10,
			},
		});

		return response.data.data;
	} catch (error: any) {
		// throw error;
		return [];
	}
}

export const autoCompleteSearchRegion = async (group: 'tinh'|'huyen'|'xa', target?: string): Promise<SearchRegionResponseType | null> => {
	try {
		const response = await axiosWithAuth.get<SuccessResponse<SearchRegionResponseType>>('/autocomplete/region-all', {
			params: {
				group,
				...(target ? { target } : {})
			},
		});

		return response.data.data;
	} catch (error: any) {
		// throw error;
		return null;
	}
}

export const autoCompleteSearchStoreProduct = async (filter: {
	query: string,
	branchId: string,
	limit?: number,
	page?: number,
	orderBy?: string,
}): Promise<Product[]> => {
	try {
		const response = await axiosWithAuth.get<SuccessResponse<Product[]>>(`/product/${filter.branchId}`, {
			params: {
				search: filter.query,
				limit: filter.limit || 10,
				page: filter.page || 1,
				orderBy: filter.orderBy || 'created_at:ASC',
			},
		});

		return response.data.data;
	} catch (error: any) {
		// throw error;
		return [];
	}
}