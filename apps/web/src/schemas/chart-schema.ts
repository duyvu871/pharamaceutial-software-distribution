export type RevenueChart = {
	import: number;
	sale: number;
} & ({day: string}|{week: string}|{month: string});

export type RevenueChartList = RevenueChart[];

export type RevenueChartListResponse = Record<'day'|'week'|'month', RevenueChartList>;

export type TopSaleProduct = {
	productName: string;
	saleAmount: number;
	saleDate: string;
	quantitySold: number;
}