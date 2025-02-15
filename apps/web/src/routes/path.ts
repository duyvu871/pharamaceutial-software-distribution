const ROOTS = {
	HOME: '/',
	DASHBOARD: '/dashboard',
};

export const paths = {
	// AUTH
	auth: {
		login: `/login`,
		register: `/register`,
	},
	settings: `/settings`,
	admin: {
		login: '/admin/login',
	}
};

export const apiPaths = {
	notification: {
		get: '/notification',
		read: '/notification/read',
		activity: '/notification/activity',
	},
	revenue: {
		getChart: '/revenue/chart',
	},
	top_sale: {
		getChart: '/top-sale/chart',
	},
	stat: {
		get: '/stat',
	},
	invoice: {
		get: '/invoice',
		getDetail: '/invoice/detail',
	}
}