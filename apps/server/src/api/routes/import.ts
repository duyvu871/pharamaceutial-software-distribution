import { validateBody, validateParams } from 'middlewares/ValidateRequest.ts';
import { BranchValidation } from 'validations/Branch.ts';
import { ImportValidation } from 'validations/ImportValidation.ts';
import { ImportController } from 'controllers/ImportController.ts';
import { authChain } from 'middlewares/Chains/auth.ts';
import { Router } from 'express';

export const importRoute = Router();

importRoute.route('/import/:branchId/product').post(
	...authChain,
	validateParams(BranchValidation.branchIdParam),
	validateBody(ImportValidation.createImportProduct),
	ImportController.importProduct
);