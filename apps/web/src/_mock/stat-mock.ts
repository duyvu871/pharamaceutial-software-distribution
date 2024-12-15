import { Stat } from '@schema/stat-schema.ts';

const main: Stat = {
	day: [
		{ title: 'Doanh thu', field: 'revenue', value: 13456, diff: 34 },
		{ title: 'Lợi nhuận', field: 'profit', value: 4145, diff: -13 },
		{ title: 'Khách hàng', field: 'customers', value: 745, diff: 18 },
	],
	week: [
		{ title: 'Doanh thu', field: 'revenue', value: 130456, diff: 34 },
		{ title: 'Lợi nhuận', field: 'profit', value: 34145, diff: -13 },
		{ title: 'Khách hàng', field: 'customers', value: 2745, diff: 18 },
	],
	month: [
		{ title: 'Doanh thu', field: 'revenue', value: 1130456, diff: 34 },
		{ title: 'Lợi nhuận', field: 'profit', value: 134145, diff: -13 },
		{ title: 'Khách hàng', field: 'customers', value: 5345, diff: 18 },
	],
};

const sub: Stat = {
	day: [
		{ title: 'Lượng trả hàng', field: 'returns', value: 10 },
		{ title: 'Hóa đơn', field: 'invoices', value: 4145, diff: -13 },
	],
	week: [
		{ title: 'Lượng trả hàng', field: 'returns', value: 10 },
		{ title: 'Hóa đơn', field: 'invoices', value: 34145, diff: -13 },
	],
	month: [
		{ title: 'Lượng trả hàng', field: 'returns', value: 10 },
		{ title: 'Hóa đơn', field: 'invoices', value: 134145, diff: -13 },
	],
};

export const statMock = {
	main,
	sub,
};