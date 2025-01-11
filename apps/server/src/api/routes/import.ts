import { validateBody, validateParams, validateQuery } from 'middlewares/ValidateRequest.ts';
import { BranchValidation } from 'validations/Branch.ts';
import { ImportValidation } from 'validations/ImportValidation.ts';
import { ImportController } from 'controllers/ImportController.ts';
import { authChain } from 'middlewares/Chains/auth.ts';
import { Router } from 'express';
import { PaginationValidation } from 'validations/Pagination.ts';

export const importRoute = Router();

importRoute.route('/import/:branchId/product').post(
	...authChain,
	validateParams(BranchValidation.branchIdParam),
	validateBody(ImportValidation.createImportProduct),
	ImportController.importProduct
);

importRoute.route('/import/:branchId/product').get(
	...authChain,
	validateParams(BranchValidation.branchIdParam),
	validateQuery(PaginationValidation.paginationQuery),
	ImportController.getImportProductList
)