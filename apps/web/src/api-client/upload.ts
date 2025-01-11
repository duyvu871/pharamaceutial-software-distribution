import axiosWithAuth from '@lib/axios.ts';
import { APIResponse, ErrorResponse, SuccessResponse } from '@type/api/response.ts';
import { UploadResponse } from '@type/api/upload.ts';
import { AxiosError } from 'axios';

export const uploadImage = async (
	file: File,
	branchId: string,
	metadata: {

	}
): Promise<UploadResponse | null> => {
	if (!file) {
		return null;
	}
	if (!branchId) {
		return null;
	}
	const formData = new FormData();
	formData.append('image', file);

	try {
		const response = await axiosWithAuth.post<SuccessResponse<UploadResponse>>(`/upload/${branchId}/image`, formData, {
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

export const uploadStoreQRCode = async (
	file: File,
	storeId: string,
): Promise<UploadResponse | ErrorResponse | null> => {
	if (!file) {
		return null;
	}
	if (!storeId) {
		return null;
	}
	const formData = new FormData();
	formData.append('image', file);

	try {
		const response = await axiosWithAuth.post<APIResponse<UploadResponse>>(`/branch/${storeId}/qrcode`, formData, {
			headers: {
				'Content-Type': 'multipart/form-data',
			},
		});
		return response.data.data;
	} catch (error) {
		console.error('Error uploading store QR code:', error);
		// throw error;
		if (error instanceof AxiosError) {
			return error?.response?.data;
		}
		return null;
	}
}