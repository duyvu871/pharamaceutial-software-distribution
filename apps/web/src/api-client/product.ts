import { SearchRegionResponseType } from '@schema/autocomplete.ts';
import axiosWithAuth from '@lib/axios.ts';
import { SuccessResponse } from '@type/api/response.ts';
import { topSaleData } from '../_mock/chart-mock.ts';
import { useMock } from 'config';
import {mockProductDetails} from '../_mock/product-mock.ts';
import { Product, ProductRender } from '@schema/product-schema.ts';

export const getProductList = async (
	filter: {
		branchId: string;
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

	if (!filter.branchId) {
		return [];
	}

	try {
		const response = await axiosWithAuth.get<SuccessResponse<Product[]>>(`/product/${filter.branchId}`, {
			params: {
				page: filter.page,
				perPage: filter.perPage,
				type: filter.productType,
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

export const uploadImage = async (file: File, branchId: string): Promise<{url: string} | null> => {
	if (!file) {
		return null;
	}
	if (!branchId) {
		return null;
	}
	const formData = new FormData();
	formData.append('image', file);

	try {
		const response = await axiosWithAuth.post<SuccessResponse<{url: string}>>(`/product/${branchId}/upload/image`, formData, {
			headers: {
				'Content-Type': 'multipart/form-data',
			},
		});
		return response.data.data;
	} catch (error) {
		console.error('Error uploading image:', error);
		// throw error;
		return null;
	}
};