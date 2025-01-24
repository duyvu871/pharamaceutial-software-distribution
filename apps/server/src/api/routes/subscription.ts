import { validateBody, validateParams, validateQuery } from 'middlewares/ValidateRequest.ts';
import { authChain } from 'middlewares/Chains/auth.ts';
import { Router } from 'express';
import { PaginationValidation } from 'validations/Pagination.ts';
import permissionMiddleware from 'middlewares/PermissionMiddleware.ts';
import { SubscriptionValidation } from 'validations/Subscription.ts';
import { SubscriptionController } from 'controllers/SubscriptionController.ts';
import { BranchValidation } from 'validations/Branch.ts';

export const subscriptionRoute = Router();

subscriptionRoute.route('/subscription/plan/:subscriptionType').get(
	...authChain,
	permissionMiddleware(['Admin.All', "Admin.Read"]),
	validateParams(SubscriptionValidation.subscriptionTypeParam),
	validateQuery(PaginationValidation.paginationQueryV2),
	SubscriptionController.getSubscriptionPLan
);

subscriptionRoute.route('/subscription/register/:subscriptionType').post(
	...authChain,
	permissionMiddleware(['Admin.All', "Admin.Update"]),
	validateParams(SubscriptionValidation.subscriptionTypeParam),
	validateBody(SubscriptionValidation.registerSubscription),
	SubscriptionController.registerSubscription
);

subscriptionRoute.route('/subscription/branch/:branchId').get(
	...authChain,
	validateParams(BranchValidation.branchIdParam),
	SubscriptionController.getBranchSubscription
)
