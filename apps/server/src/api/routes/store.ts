import { Router } from "express";
import { StoreController } from 'controllers/StoreController.ts';
import { authChain } from 'middlewares/Chains/auth.ts';
import { validateParams } from 'middlewares/ValidateRequest.ts';
import { BranchValidation } from 'validations/Branch.ts';

export const storeRouter = Router();

storeRouter.route("/store/:branchId").get(
	...authChain,
	validateParams(BranchValidation.branchIdParam),
	StoreController.getStores
);