import { Stat } from '@schema/stat-schema.ts';

const main: Stat = {
	day: [
		{ title: 'Doanh thu', field: 'revenue', value: 0, diff: 0 },
		{ title: 'Lợi nhuận', field: 'profit', value: 0, diff: 0 },
		{ title: 'Khách hàng', field: 'customers', value: 0, diff: 0 },
	],
	week: [
		{ title: 'Doanh thu', field: 'revenue', value: 0, diff: 0 },
		{ title: 'Lợi nhuận', field: 'profit', value: 0, diff: 0 },
		{ title: 'Khách hàng', field: 'customers', value: 0, diff: 0 },
	],
	month: [
		{ title: 'Doanh thu', field: 'revenue', value: 0, diff: 0 },
		{ title: 'Lợi nhuận', field: 'profit', value: 0, diff: 0 },
		{ title: 'Khách hàng', field: 'customers', value: 0, diff: 0 },
	],
};

const sub: Stat = {
	day: [
		{ title: 'Lượng trả hàng', field: 'returns', value: 0 },
		{ title: 'Hóa đơn', field: 'invoices', value: 0, diff: 0 },
	],
	week: [
		{ title: 'Lượng trả hàng', field: 'returns', value: 0 },
		{ title: 'Hóa đơn', field: 'invoices', value: 0, diff: 0 },
	],
	month: [
		{ title: 'Lượng trả hàng', field: 'returns', value: 0 },
		{ title: 'Hóa đơn', field: 'invoices', value: 0, diff: 0 },
	],
};

export const statMock = {
	main,
	sub,
};