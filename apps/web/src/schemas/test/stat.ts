export type Stat = Record<'Admin' | 'Store' |'user', StatItem[] | Stores[] | Tenant[] | GroupStore[]>
export type StatItem = {
	id: number;
	phoneNumber?: string;
	username: string;
	fullName: string;
	address: string;
	email: string;
	gender: string;
	birthDate: string;
	status: boolean

}
export type StatItems = {
	id: number;
	phoneNumber?: string;
	username: string;
	fullName: string;
	address: string;
	email: string;
	gender: string;
	birthDate: string;

}
export type Tenant = {
	createdAt: string;
	updatedAt: string;
	id: number;
	username: string;
	dob: string | null;
	phone: string | null;
	name: string | null;
	firstName: string;
	lastName: string | null;
	gender: string | null;
	address: string;
	wards: string;
	district: string;
	city: string;
	postCode: string | null;
	avatar: string | null;
	bio: string | null;
	email: string | null;
	active: boolean;
	groupStoreId: number;
};

export type GroupStore = {
	createdAt: string;
	updatedAt: string;
	id: number;
	code: string;
	tenant: Tenant;
};

export type Stores = {
	createdAt: string;
	updatedAt: string;
	username: string;
	dob: string | null;
	firstName: string;
	lastName: string | null;
	gender: string | null;
	address: string;
	wards: string;
	district: string;
	city: string;
	postCode: string | null;
	avatar: string | null;
	bio: string | null;
	email: string | null;
	roleId: number;
	nextExtendDay: string;
	extendDay: string;
	id: number;
	code: string;
	name: string;
	phone: string;
	managerId: number;
	storeGroupId: number;
	usernameLink: string | null;
	level: number;
	active: boolean;
	activeRewards: boolean;
	rewardsPerPoint: number;
	pointPerRewards: number;
	paymentInfo: string | null;
	groupStore: GroupStore;
	tenantId: number;
	tenantName: string;
	tenantEmail: string | null;
};
