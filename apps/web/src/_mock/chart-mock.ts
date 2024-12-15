import { RevenueChartListResponse, TopSaleProduct } from '@schema/chart-schema.ts';

export const revenueChartMock: RevenueChartListResponse = {
	day: [
		{ day: '2024-02-01', import: 300000, sale: 400000 },
		{ day: '2024-02-05', import: 280000, sale: 380000 },
		{ day: '2024-02-10', import: 320000, sale: 420000 },
		{ day: '2024-02-15', import: 350000, sale: 450000 },
		{ day: '2024-02-20', import: 290000, sale: 390000 },
		{ day: '2024-02-25', import: 310000, sale: 410000 },
		{ day: '2024-03-01', import: 350000, sale: 480000 },
	],
	week: [
		{ week: 'Tuần 1 tháng 2', import: 1800000, sale: 2300000 },
		{ week: 'Tuần 2 tháng 2', import: 1900000, sale: 2400000 },
		{ week: 'Tuần 3 tháng 2', import: 2100000, sale: 2600000 },
		{ week: 'Tuần 4 tháng 2', import: 2000000, sale: 2500000 },
	],
	month: [
		{ month: 'Tháng 2', import: 18000000, sale: 23000000 },
		{ month: 'Tháng 3', import: 20000000, sale: 25000000 },
		{ month: 'Tháng 4', import: 22000000, sale: 27000000 },
		{ month: 'Tháng 5', import: 24000000, sale: 29000000 },
		{ month: 'Tháng 6', import: 21000000, sale: 26000000 },
	],
};

export const topSaleData: TopSaleProduct[] = [
	{ productName: 'Thuốc A', saleAmount: 50000000, saleDate: '2024-03-15', quantitySold: 1000 },
	{ productName: 'Thuốc B', saleAmount: 45000000, saleDate: '2024-02-28', quantitySold: 900 },
	{ productName: 'Thuốc C', saleAmount: 40000000, saleDate: '2024-03-05', quantitySold: 800 },
	{ productName: 'Thuốc D', saleAmount: 38000000, saleDate: '2024-01-20', quantitySold: 760 },
	{ productName: 'Thuốc E', saleAmount: 35000000, saleDate: '2024-02-10', quantitySold: 700 },
]