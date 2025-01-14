import axiosWithAuth from '@lib/axios.ts';
import { API_ENDPOINT, API_URL, PREFIX, PREFIX_VERSION } from 'config';
import {
	BranchDetails,
	BranchType,
	CreateBranchType,
	CreatedBranchResponse,
	IntegrationFormValues,
	PaymentFormValues, PointSettingsFormValues,
} from '@schema/branch-schema.ts';
import { ErrorResponse, SuccessResponse } from '@type/api/response.ts';
import { AxiosError } from 'axios';
import { getCookie, setCookie } from '@util/cookie.ts';
import { parseJson } from '@util/parse-json.ts';

export const getBranches = async (branchId: string): Promise<BranchType> => {
	try {
		// const cookieBranchId = `branch_id_${branchId}`;
		// const cookiedBranchStored = getCookie(cookieBranchId);
		// if (cookiedBranchStored) {
		// 	return parseJson<BranchType>(cookiedBranchStored) as BranchType;
		// }
		const response = await axiosWithAuth.get<SuccessResponse<BranchType>>(`/branch/detail`, {
			params: {
				branch_id: branchId,
			},
		});
		if (response?.data?.data) {
			const expiry = new Date();
			expiry.setDate(expiry.getDate() + 1);
			setCookie(`branch_id_${branchId}`, JSON.stringify(response.data.data), expiry.toUTCString());
		}
		return response.data.data;
	} catch (error:any) {
		return error.response?.data;
	}
}

export const createBranch = async (data: CreateBranchType):
	Promise<CreatedBranchResponse & Partial<ErrorResponse>> =>
{
	try {
		const response = await axiosWithAuth.post<
			SuccessResponse<CreatedBranchResponse> & ErrorResponse
		>(`/branch/create`, data);

		return response.data.data;
	} catch (error: any) {
		// if (error instanceof AxiosError) {
			return error.response?.data;
		// }
		// return error
	}
}


export const updateBranchDetail = async (branchId: string, data: Partial<BranchDetails>) => {
	try {
		const response = await axiosWithAuth.post<SuccessResponse<BranchType>>(`/branch/${branchId}/update-detail`, {
			...data,
		});
		return response.data.data;
	} catch (error: any) {
		return error.response?.data;
	}
}

export const upsertBranchIntegration = async (branchId: string, data: Partial<IntegrationFormValues>) => {
	if (!branchId) {
		return {
			error: 'Branch ID is required'
		}
	}
	try {
		const response = await axiosWithAuth.post<SuccessResponse<BranchType>>(`/branch/${branchId}/upsert-integration`, {
			...({
				integration_id: data.integrationCode,
				integration_account: data.integrationAccount,
				integration_password: data.integrationPassword
			}),
		});
		return response.data.data;
	} catch (error: any) {
		return error.response?.data;
	}
}

export const getBranchIntegration = async (branchId: string) => {
	try {
		const response = await axiosWithAuth.get<SuccessResponse<{
			integration_id: string;
			integration_account: string;
			integration_password: string
		} | null>>(`/branch/${branchId}/get-integration`);
		return response.data.data;
	} catch (error: any) {
		// return error.response?.data;
		throw new Error(error?.response?.data?.message || 'Lỗi khi lấy thông tin liên thông');
	}
}

export const upsertBranchDetail = async (branchId: string, data: Partial<BranchDetails>): Promise<BranchDetails> => {
	try {
		const response = await axiosWithAuth.post<SuccessResponse<BranchDetails>>(`/branch/${branchId}/upsert-pharmacy-detail`, {
			...data,
		});
		return response.data.data;
	} catch (error: any) {
		throw new Error(error.response?.data.errorDescription || 'Lỗi khi lưu thông tin chi nhánh');
	}
}

export const getBranchDetail = async (branchId: string): Promise<BranchDetails | null> => {
	try {
		const response = await axiosWithAuth.get<SuccessResponse<BranchDetails>>(`/branch/${branchId}/get-pharmacy-detail`);
		return response.data.data;
	} catch (error: any) {
		throw new Error(error.response?.data.errorDescription || 'Lỗi khi lấy thông tin chi nhánh');
	}
}

export const upsertBranchPayment = async (branchId: string, data: Partial<PaymentFormValues>) => {
	try {
		const response = await axiosWithAuth.post<SuccessResponse<BranchDetails>>(`/branch/${branchId}/upsert-payment`, {
			...({
				payment_account: data.bankAccount,
				payment_bank: data.bankName,
				payment_owner: data.bankOwner
			}),
		});
		return response.data.data;
	} catch (error: any) {
		return error.response?.data;
	}
}

export const getBranchPayment = async (branchId: string) => {
	try {
		const response = await axiosWithAuth.get<SuccessResponse<{
			payment_account_number: string;
			payment_bank: string;
			payment_account_owner: string;
		}>>(`/branch/${branchId}/get-payment`);
		return response.data.data;
	} catch (error: any) {
		// return error.response?.data;
		throw new Error(error?.response?.data?.message || 'Lỗi khi lấy thông tin thanh toán');
	}
}

export const upsertBranchRewardPoint = async (branchId: string, data: PointSettingsFormValues) => {
	try {
		const response = await axiosWithAuth.post<SuccessResponse<BranchDetails>>(`/branch/${branchId}/upsert-reward-point`, {
			...data,
		});
		return response.data.data;
	} catch (error: any) {
		throw new Error(error?.response?.data?.message || 'Lỗi khi lưu cài đặt điểm thưởng');
	}
}