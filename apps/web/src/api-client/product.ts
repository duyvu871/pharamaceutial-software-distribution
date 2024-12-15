import { SearchRegionResponseType } from '@schema/autocomplete.ts';
import axiosWithAuth from '@lib/axios.ts';
import { SuccessResponse } from '@type/api/response.ts';
import { topSaleData } from '../_mock/chart-mock.ts';
import { useMock } from 'config';
import {mockProductDetails} from '../_mock/product-mock.ts';
import { Product, ProductRender } from '@schema/product-schema.ts';

export const getProductList = async (
	filter: {
		page: number;
		perPage: number;
		limit: number;
		search?: string;
		productStatus?: string;
		productType?: string;
		productQuotaStock?: string;
	},
	isMock?: boolean,
): Promise<Product[]> => {
	if ((typeof isMock === 'boolean' && isMock)) {
		return mockProductDetails;
	}

	if (typeof isMock === 'undefined' && useMock) {
		return mockProductDetails;
	}
	try {
		const response = await axiosWithAuth.get<SuccessResponse<Product[]>>('/autocomplete/region-all', {
			params: {
				page: filter.page,
				perPage: filter.perPage,
				limit: filter.limit,
				search: filter.search,
				productStatus: filter.productStatus,
				productType: filter.productType,
				productQuotaStock: filter.productQuotaStock,
			},
		});

		return response.data.data;
	} catch (error: any) {
		// throw error;
		return [];
	}
}