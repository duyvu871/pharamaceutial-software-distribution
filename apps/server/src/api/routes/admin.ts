import { validateBody, validateParams, validateQuery } from 'middlewares/ValidateRequest.ts';
import { BranchValidation } from 'validations/Branch.ts';
import { authChain } from 'middlewares/Chains/auth.ts';
import { Router } from 'express';
import { PaginationValidation } from 'validations/Pagination.ts';
import DoctorController from 'controllers/DoctorController.ts';
import { DoctorValidation } from 'validations/Doctor.ts';
import { AdminController } from 'controllers/AdminController.ts';
import { AdminValidation } from 'validations/Admin.ts';
import permissionMiddleware from 'middlewares/PermissionMiddleware.ts';
import { HighEndProtected } from 'middlewares/HighEndProtected.ts';

export const adminRoute = Router();

adminRoute.route('/admin').get(
	...authChain,
	permissionMiddleware(['Admin.All', "Admin.Read"]),
	validateQuery(PaginationValidation.paginationQueryV2),
	AdminController.getAdmin
);

adminRoute.route('/admin').post(
	...authChain,
	HighEndProtected,
	permissionMiddleware(['Admin.All', "Admin.Create"]),
	validateBody(AdminValidation.adminCreation),
	AdminController.createOtherAdmin
)

adminRoute.route('/admin/check-high-end').get(
	...authChain,
	permissionMiddleware(['Admin.All', "Admin.Read"]),
	AdminController.checkHighEndAdmin
)

adminRoute.route('/admin/branches').get(
	...authChain,
	permissionMiddleware(['Admin.All', "Admin.Read"]),
	validateQuery(PaginationValidation.paginationQueryV2),
	AdminController.getBranches
)

adminRoute.route('/admin/branches').post(
	...authChain,
	permissionMiddleware(['Admin.All', "Admin.Create", "Branch.Update"]),
	validateBody(BranchValidation.createBranchBody),
	AdminController.createOrUpdateBranch
)

adminRoute.route('/admin/user-slave').get(
	...authChain,
	permissionMiddleware(['Admin.All', "Admin.Read"]),
	validateQuery(PaginationValidation.paginationQueryV2),
	AdminController.getUserSlaves
);

adminRoute.route('/admin/user-slave').post(
	...authChain,
	permissionMiddleware(['Admin.All', "Admin.Read"]),
	validateBody(AdminValidation.userCreation),
	AdminController.createOrUpdateUserSlave
);

adminRoute.route('/admin/:adminId').post(
	...authChain,
	permissionMiddleware(['Admin.All', "Admin.Update"]),
	validateParams(AdminValidation.adminIdParam),
	validateBody(AdminValidation.adminCreation),
	AdminController.updateAdmin
)

adminRoute.route('/admin/:adminId').get(
	...authChain,
	permissionMiddleware(['Admin.All', "Admin.Read"]),
	validateParams(AdminValidation.adminIdParam),
	AdminController.getAdminById
);

adminRoute.route('/admin/:adminId').delete(
	...authChain,
	HighEndProtected,
	permissionMiddleware(['Admin.All', "Admin.Delete"]),
	validateParams(AdminValidation.adminIdParam),
	// AdminController.deleteAdmin
);
