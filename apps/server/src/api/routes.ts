import { Router, Request, Response } from "express";
import { validateBody, validateHeader, validateParams, validateQuery } from 'middlewares/ValidateRequest';
import { AuthorizationValidation } from 'validations/Authorization';
import { AuthController } from 'controllers/AuthController';
import JsonWebToken from 'middlewares/JsonWebToken';
import { UserController } from 'controllers/UserController';
import { UserValidation } from 'validations/User';
import { BranchValidation } from 'validations/Branch';
import permissionMiddleware from 'middlewares/PermissionMiddleware';
import { BranchPermission } from 'server/repository/branch/schema';
import { BranchController } from 'controllers/BranchController';
import { AutocompleteValidation } from 'validations/Autocomplete';
import { AutoCompleteController } from 'controllers/AutocompleteController';
import { RegionSearchController } from 'controllers/RegionSearchController';
import { ConsumerController } from 'controllers/ConsumerController';
import { ConsumerValidation } from 'validations/Consumer';
import { MembershipController } from 'controllers/MembershipController';
import { PaginationValidation } from 'validations/Pagination';
import { MembershipValidation } from 'validations/Membership';
import { ProductController } from 'controllers/ProductController';
import { ProductValidation } from 'validations/Product.ts';
import { ProviderController } from 'controllers/ProviderController.ts';

const apiRouter = Router();
const pageRouter = Router();

const authChain = [validateHeader(AuthorizationValidation.headers), JsonWebToken,]

// Auth routes
apiRouter.route('/auth/login').post(validateBody(AuthorizationValidation.login), AuthController.login);
apiRouter.route('/auth/register').post(validateBody(AuthorizationValidation.register), AuthController.register);
apiRouter.route('/auth/refresh').post(validateBody(AuthorizationValidation.refreshToken), AuthController.refreshToken);
apiRouter.route('/auth/verify-session').post(validateHeader(AuthorizationValidation.verifySession), AuthController.verifySession);

// User routes
apiRouter.route('/user/profile').get(
  ...authChain,
  validateQuery(UserValidation.profileQuery),
  UserController.getProfile);

// Branch route
apiRouter.route('/branch/create').post(
  ...authChain,
  permissionMiddleware([BranchPermission.ALL, BranchPermission.CREATE]),
  validateBody(BranchValidation.createBranchBody),
  BranchController.createBranch
)
apiRouter.route('/branch/detail').get(
  ...authChain,
  validateQuery(BranchValidation.getBranchesQuery),
  BranchController.getBranch
)

// Autocomplete route
apiRouter.route('/autocomplete/product').get(
  validateQuery(AutocompleteValidation.queryProduct),
  AutoCompleteController.searchWithCSV
)
apiRouter.route('/autocomplete/region-all').get(
  validateQuery(AutocompleteValidation.queryRegionAll),
  RegionSearchController.getAllRegions
)

// Consumer routes
apiRouter.route('/consumer/:branchId').get(
  ...authChain,
  validateQuery(ConsumerValidation.getConsumersQuery),
  validateParams(ConsumerValidation.getConsumerParam),
  ConsumerController.getConsumers);

apiRouter.route('/consumer/:branchId').post(
  ...authChain,
  validateParams(ConsumerValidation.getConsumerParam),
  validateBody(ConsumerValidation.createConsumer),
  ConsumerController.createConsumer);

// membership routes
apiRouter.route('/membership/:branchId').get(
  ...authChain,
  validateParams(BranchValidation.branchIdParam),
  validateBody(PaginationValidation.paginationQuery),
  MembershipController.getMemberships);
apiRouter.route('/membership/:branchId').post(
  ...authChain,
  validateParams(BranchValidation.branchIdParam),
  validateBody(MembershipValidation.createMembership),
  MembershipController.createMembership);

// Product routes
apiRouter.route('/product/:branchId').get(
  ...authChain,
  validateQuery(PaginationValidation.paginationQuery),
  ProductController.getProducts);
apiRouter.route('/product/:branchId').post(
  ...authChain,
  validateParams(BranchValidation.branchIdParam),
  validateBody(ProductValidation.createProduct),
  ProductController.createProduct);
apiRouter.route('/product/:branchId/delete/:productId').delete(
  ...authChain,
  validateParams(ProductValidation.deleteProductParams),
  ProductController.deleteProduct);


// Provider routes
apiRouter.route('/provider/:branchId').get(
  ...authChain,
  validateQuery(PaginationValidation.paginationQuery),
  ProviderController.getProviders);
export default {
    apiRoutes: apiRouter,
    pageRoutes: pageRouter
};