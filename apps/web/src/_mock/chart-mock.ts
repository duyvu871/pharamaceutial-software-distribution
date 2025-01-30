import { RevenueChartListResponse, TopSaleProduct } from '@schema/chart-schema.ts';

export const revenueChartMock: RevenueChartListResponse = {
	day: [
		{ day: '2024-02-01', import: 0, sale: 0 },
		{ day: '2024-02-05', import: 0, sale: 0 },
		{ day: '2024-02-10', import: 0, sale: 0 },
		{ day: '2024-02-15', import: 0, sale: 0 },
		{ day: '2024-02-20', import: 0, sale: 0 },
		{ day: '2024-02-25', import: 0, sale: 0 },
		{ day: '2024-03-01', import: 0, sale: 0 },
	],
	week: [
		{ week: 'Tuần 1 tháng 2', import: 0, sale: 0 },
		{ week: 'Tuần 2 tháng 2', import: 0, sale: 0 },
		{ week: 'Tuần 3 tháng 2', import: 0, sale: 0 },
		{ week: 'Tuần 4 tháng 2', import: 0, sale: 0 },
	],
	month: [
		{ month: 'Tháng 2', import: 0, sale: 0 },
		{ month: 'Tháng 3', import: 0, sale: 0 },
		{ month: 'Tháng 4', import: 0, sale: 0 },
		{ month: 'Tháng 5', import: 0, sale: 0 },
		{ month: 'Tháng 6', import: 0, sale: 0 },
	],
};

export const topSaleData: TopSaleProduct[] = [
	{ productName: 'Thuốc A', saleAmount: 0, saleDate: '2024-03-15', quantitySold: 0 },
	{ productName: 'Thuốc B', saleAmount: 0, saleDate: '2024-02-28', quantitySold: 0 },
	{ productName: 'Thuốc C', saleAmount: 0, saleDate: '2024-03-05', quantitySold: 0 },
	{ productName: 'Thuốc D', saleAmount: 0, saleDate: '2024-01-20', quantitySold: 0 },
	{ productName: 'Thuốc E', saleAmount: 0, saleDate: '2024-02-10', quantitySold: 0 },
]