import axiosWithAuth from '@lib/axios';
import { CreationFinancialLedger, FinancialLedger } from '@schema/financial-schema';
import { FilterParams } from '@type/api/params.ts';
import { Pagination, SuccessResponse } from '@type/api/response';

export const getFinancialLedger = async (
	filter: FilterParams
) => {
	try {
		if (!filter.branchId) {
			throw new Error('Branch ID is required');
		}

		const response = await axiosWithAuth.get<SuccessResponse<Pagination<FinancialLedger>>>(`/financial-ledger/${filter.branchId}`, {
			params: {
				page: filter.page,
				pageSize: filter.limit,
				search: filter.search,
				searchFields: filter.searchFields,
				orderBy: filter.orderBy,
				filterBy: filter.filterBy,
			},
		});

		return response.data.data;
	} catch (error) {
		throw error;
	}
}

export const upsertFinancialLedger = async (
	branchId: string,
	financialLedger: Partial<CreationFinancialLedger>
) => {
	try {
		if (!branchId) {
			throw new Error('Branch ID is required');
		}
		const response = await axiosWithAuth.post<SuccessResponse<FinancialLedger>>(`/financial-ledger/${branchId}`, financialLedger);
		return response.data.data;
	} catch (error) {
		throw error;
	}
}