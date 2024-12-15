import * as zod from 'zod';
import { BranchPermission } from 'server/repository/branch/schema';

export const membershipPermission = zod.enum([
	BranchPermission.READ,
	BranchPermission.UPDATE,
	BranchPermission.CREATE,
	'Medicine.Read',
	'Medicine.Update',
	'Medicine.Create',
	'Medicine.Delete',
	'Promotion.Read',
	'Promotion.Update',
	'Promotion.Create',
	'Promotion.Delete',
	'Customer.Read',
	'Customer.Update',
	'Customer.Create',
	'Customer.Delete',
	'Supplier.Read',
	'Supplier.Update',
	'Supplier.Create',
	'Supplier.Delete',
	'Report.Read',
	'Report.Update',
	'Report.Create',
]);

export const userPermission = zod.enum([
	'Report.All',
	'Supplier.All',
	'Medicine.All',
	'Membership.All',
	'Promotion.All',
	'Customer.All',
	BranchPermission.ALL,
	'User.Read',
	'User.Update',
	'User.Create',
]);

export const adminPermission = zod.enum([
	BranchPermission.ALL,
	'Report.All',
	'Supplier.All',
	'Medicine.All',
	'Membership.All',
	'Promotion.All',
	'User.All',
	'Admin.All',
]);

// export const allPermission = {
// 	ADMIN: {
// 		ALL: 'Admin.All',
// 		READ: 'Admin.Read',
// 		UPDATE: 'Admin.Update',
// 		CREATE: 'Admin.Create',
// 		DELETE: 'Admin.Delete',
// 	},
// 	USER: {
// 		ALL: 'User.All',
// 		READ: 'User.Read',
// 		UPDATE: 'User.Update',
// 		CREATE: 'User.Create',
// 		DELETE: 'User.Delete',
// 	},
// 	MEMBERSHIP: {
// 		ALL: 'Membership.All',
// 		READ: 'Membership.Read',
// 		UPDATE: 'Membership.Update',
// 		CREATE: 'Membership.Create',
// 		DELETE: 'Membership.Delete',
// 	},
// 	CUSTOMER: {
// 		ALL: 'Customer.All',
// 		READ: 'Customer.Read',
// 		UPDATE: 'Customer.Update',
// 		CREATE: 'Customer.Create',
// 		DELETE: 'Customer.Delete',
// 	},
// 	SUPPLIER: {
// 		ALL: 'Supplier.All',
// 		READ: 'Supplier.Read',
// 		UPDATE: 'Supplier.Update',
// 		CREATE: 'Supplier.Create',
// 		DELETE: 'Supplier.Delete',
// 	},
// 	MEDICINE: {
// 		ALL: 'Medicine.All',
// 		READ: 'Medicine.Read',
// 		UPDATE: 'Medicine.Update',
// 		CREATE: 'Medicine.Create',
// 		DELETE: 'Medicine.Delete',
// 	},
// 	PROMOTION: {
// 		ALL: 'Promotion.All',
// 		READ: 'Promotion.Read',
// 		UPDATE: 'Promotion.Update',
// 		CREATE: 'Promotion.Create',
// 		DELETE: 'Promotion.Delete',
// 	},
// 	REPORT: {
// 		ALL: 'Report.All',
// 		READ: 'Report.Read',
// 		UPDATE: 'Report.Update',
// 		CREATE: 'Report.Create',
// 		DELETE: 'Report.Delete',
// 	},
// 	BRANCH: {
// 		ALL: 'Branch.All',
// 		READ: 'Branch.Read',
// 		UPDATE: 'Branch.Update',
// 		CREATE: 'Branch.Create',
// 		DELETE: 'Branch.Delete',
// 	}
// } as const;

export const getAuthPermission = (type: 'ADMIN' | 'USER' | 'MEMBERSHIP') => {
	let permission: string[];
	switch (type) {
		case 'ADMIN':
			permission = adminPermission.options;
			break;
		case 'USER':
			permission = userPermission.options;
			break;
		case 'MEMBERSHIP':
			permission = membershipPermission.options;
			break;
		default:
			permission = [];
			break;
	}
	return permission;
}