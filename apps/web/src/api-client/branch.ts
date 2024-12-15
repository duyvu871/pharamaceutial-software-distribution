import axiosWithAuth from '@lib/axios.ts';
import { API_ENDPOINT, API_URL, PREFIX, PREFIX_VERSION } from 'config';
import { BranchType, CreateBranchType, CreatedBranchResponse } from '@schema/branch-schema.ts';
import { ErrorResponse, SuccessResponse } from '@type/api/response.ts';
import { AxiosError } from 'axios';
import { getCookie, setCookie } from '@util/cookie.ts';
import { parseJson } from '@util/parse-json.ts';

export const getBranches = async (branchId: string): Promise<BranchType> => {
	try {
		const cookieBranchId = `branch_id_${branchId}`;
		const cookiedBranchStored = getCookie(cookieBranchId);
		if (cookiedBranchStored) {
			return parseJson<BranchType>(cookiedBranchStored);
		}
		const response = await axiosWithAuth.get(`/branch/detail`, {
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