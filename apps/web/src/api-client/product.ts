import { SearchRegionResponseType } from '@schema/autocomplete.ts';
import axiosWithAuth from '@lib/axios.ts';
import { Pagination, SuccessResponse } from '@type/api/response.ts';
import { topSaleData } from '../_mock/chart-mock.ts';
import { useMock } from 'config';
import {mockProductDetails} from '../_mock/product-mock.ts';
import { CreationProductSchema, Product, ProductRender } from '@schema/product-schema.ts';
import { UploadResponse } from '@type/api/upload.ts';
import { FilterParams } from '@type/api/params.ts';

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

export const getProductListWithFilter = async (
	filter: FilterParams,
	type?: string
) => {
	if (!filter.branchId) {
		// return [];
		throw new Error('Branch ID is required');
	}

	try {
		const response = await axiosWithAuth.get<SuccessResponse<Pagination<Product>>>(`/product/${filter.branchId}/get/${type || ""}`, {
			params: filter,
		});

		return response.data.data;
	} catch (error: any) {
		throw error;
	}
}

export const updateProduct = async (branchId: string, productId: string, data: CreationProductSchema): Promise<Product | null> => {
	if (!branchId || !productId) {
		return null;
	}

	try {
		const response = await axiosWithAuth.post<SuccessResponse<Product>>(`/product/${branchId}/update/${productId}`, data);
		return response.data.data;
	} catch (error: any) {
		console.log('Error updating product:', error);
		return null;
	}
}

export const uploadImage = async (file: File, branchId: string): Promise<UploadResponse | null> => {
	if (!file) {
		return null;
	}
	if (!branchId) {
		return null;
	}
	const formData = new FormData();
	formData.append('image', file);

	try {
		const response = await axiosWithAuth.post<SuccessResponse<UploadResponse>>(`/product/${branchId}/upload/image`, formData, {
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
