import { RevenueChartListResponse, TopSaleProduct } from '@schema/chart-schema.ts';
import { ErrorResponse, SuccessResponse } from '@type/api/response.ts';
import { revenueChartMock, topSaleData } from 'src/_mock/chart-mock.ts';
import { API_URL, useMock } from 'config';
import axiosWithAuth from '@lib/axios.ts';
import { apiPaths } from '@route/path.ts';
import { Stat } from '@schema/stat-schema.ts';
import { statMock } from '../_mock/stat-mock.ts';

export type GetReportChartParams = {
	from: string;
	to: string;
	orderby?: 'day' | 'week' | 'month';
}
export type GetStatParams = GetReportChartParams & {
	type: 'main' | 'sub';
};

export const getRevenueReportChart = async (params: GetReportChartParams, isMock?: boolean): Promise<RevenueChartListResponse & Partial<ErrorResponse>> => {
	if ((typeof isMock === 'boolean' && isMock)) {
		return revenueChartMock;
	}

	if (typeof isMock === 'undefined' && useMock) {
		return revenueChartMock;
	}

	try {
		const response = await axiosWithAuth.get<SuccessResponse<RevenueChartListResponse>>(`${API_URL}/${apiPaths.revenue.getChart}`, {
			params: {
				from: params.from,
				to: params.to,
				orderby: params.orderby,
			},
		});

		return response.data.data;
	} catch (error: any) {
		return error.response?.data;
	}
}

export const getTopSales = async (params: GetReportChartParams, isMock?: boolean): Promise<TopSaleProduct[]> => {
	if ((typeof isMock === 'boolean' && isMock)) {
		return topSaleData;
	}

	if (typeof isMock === 'undefined' && useMock) {
		return topSaleData;
	}

	try {
		const response = await axiosWithAuth.get<SuccessResponse<TopSaleProduct[]>>(`${API_URL}/${apiPaths.top_sale.getChart}`, {
			params: {
				from: params.from,
				to: params.to,
			},
		});

		return response.data.data;
	} catch (error: any) {
		return error.response?.data;
	}
}

export const getStat = async (params: GetStatParams, isMock?: boolean): Promise<Stat> => {
	if ((typeof isMock === 'boolean' && isMock)) {
		return statMock[params.type];
	}

	if (typeof isMock === 'undefined' && useMock) {
		return statMock[params.type];
	}

	try {
		const response = await axiosWithAuth.get<SuccessResponse<Stat>>(`${API_URL}/${apiPaths.stat.get}`, {
			params: {
				from: params.from,
				to: params.to,
			},
		});

		return response.data.data;
	} catch (error: any) {
		return error.response?.data;
	}
}