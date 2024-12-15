import { API_URL, useMock } from 'config';
import { notiActionMock, notificationMock } from '../_mock/noti-mock.ts';
import { NotiAction, Notification } from '@schema/noti-schema.ts';
import axiosWithAuth from '@lib/axios.ts';
import { ErrorResponse, SuccessResponse } from '@type/api/response.ts';
import { apiPaths } from '@route/path.ts';

export type QueryOption = {
	page: number;
	limit: number;
	order: string;
}

export const getNotifications = async (queryOption: QueryOption, isMock?: boolean): Promise<Notification[]> => {
	if ((typeof isMock === 'boolean' && isMock)) {
		return notificationMock;
	}
	if (typeof isMock === 'undefined' && useMock) {
		return notificationMock;
	}

	try {
		const response = await axiosWithAuth.get<SuccessResponse<Notification[]>>(`${API_URL}/${apiPaths.notification.get}`, {
			params: {
				page: queryOption.page,
				limit: queryOption.limit,
				order: queryOption.order//'createdAt:desc,updatedAt:desc',
			},
		});

		return response.data.data;
	} catch (error: any) {
		return error.response?.data;
	}
}

export const readNotification = async (id: string, isMock?: boolean): Promise<boolean | ErrorResponse> => {
	if ((typeof isMock === 'boolean' && isMock)) {
		return true;
	}

	if (typeof isMock === 'undefined' && useMock) {
		return true;
	}

	try {
		const response = await axiosWithAuth.post<SuccessResponse<boolean>>(`${API_URL}/${apiPaths.notification.read}/${id}`);

		return response.data.data;
	} catch (error: any) {
		return error.response?.data;
	}
}

export const getActivities = async (queryOption: QueryOption, isMock?: boolean): Promise<NotiAction[]> => {
	if ((typeof isMock === 'boolean' && isMock)) {
		return notiActionMock;
	}
	if (typeof isMock === 'undefined' && useMock) {
		return notiActionMock;
	}

	try {
		const response = await axiosWithAuth.get<SuccessResponse<NotiAction[]>>(`${API_URL}/${apiPaths.notification.activity}`, {
			params: {
				page: queryOption.page,
				limit: queryOption.limit,
				order: queryOption.order//'createdAt:desc,updatedAt:desc',
			},
		});

		return response.data.data;
	} catch (error: any) {
		return error.response?.data;
	}
}