import { ImportProductState } from '@store/state/overview/import-product.ts';
import axiosWithAuth from '@lib/axios.ts';
import { Pagination, SuccessResponse } from '@type/api/response.ts';
import { ImportInvoiceProductSchema, ImportSchema } from '@schema/import-schema.ts';
import { IProduct } from '@schema/product-schema.ts';
import { Provider } from '@schema/provider-schema.ts';
import { FilterParams } from '@type/api/params.ts';

export interface ResponseImportProduct extends ImportSchema {
	products: IProduct[]
}

export interface ResponseImportProductList {
	count: number;
	data: (
		ImportSchema
		&
		{
			import_invoice_product: (
				ImportInvoiceProductSchema
				& {
					product: IProduct;
				}
			)[];
			provider: (Provider) | null;
		})[];
}

export const createImportProduct = async (importProduct: ImportProductState, branchId: string): Promise<ResponseImportProduct> => {
	if (!branchId) {
		throw new Error("Branch id is required");
	}
	try {
		const response = await axiosWithAuth.post<SuccessResponse<ResponseImportProduct>>(`/import/${branchId}/product`, importProduct);
		return response.data.data;
	} catch (error) {
		throw new Error("error");
	}
}

export const getImportProductList = async (filter: {
	branchId: string;
	page: number;
	limit: number;
	orderBy?: string;
}): Promise<ResponseImportProductList> => {
	if (!filter.branchId) {
		throw new Error("Branch id is required");
	}
	try {
		const response = await axiosWithAuth.get<SuccessResponse<ResponseImportProductList>>(`/import/${filter.branchId}/product`, {
			params: {
				page: filter.page,
				limit: filter.limit,
				orderBy: filter.orderBy
			}
		});
		return response.data.data;
	} catch (error) {
		throw new Error("error");
	}
}

export const getImportByProduct = async (productId: string, filter: FilterParams) => {
	try {
		if (!filter.branchId) {
			throw new Error("Branch id is required");
		}
		if (!productId) {
			throw new Error("Product id is required");
		}

		const response = await axiosWithAuth.get<SuccessResponse<Pagination<ImportInvoiceProductSchema>>>(`/import/${filter.branchId}/product/${productId}`, {
			params: filter
		});

		return response.data.data;
	} catch (error) {
		throw error;
	}
}