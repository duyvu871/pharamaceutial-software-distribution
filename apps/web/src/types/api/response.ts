export type ErrorResponse = {
	errorCode: string;
	errorDescription: string;
	errorMessage: string;
	statusCode: number;
}

export interface SuccessResponse<DataResponse = object | [] | null > {
	status: number,
	message: string,
	data: DataResponse;
}

export type APIResponse<DataResponse = object | [] | null> = SuccessResponse<DataResponse> & ErrorResponse;