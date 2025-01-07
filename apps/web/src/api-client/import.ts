import { ImportProductState } from '@store/state/overview/import-product.ts';
import axiosWithAuth from '@lib/axios.ts';
import { SuccessResponse } from '@type/api/response.ts';

export const createImportProduct = async (importProduct: ImportProductState, branchId: string): Promise<any> => {
	if (!branchId) {
		return "error";
	}
	try {
		const response = await axiosWithAuth.post<SuccessResponse<any>>(`/import/${branchId}/product`, importProduct);
		return response.data.data;
	} catch (error) {
		return "error";
	}
}