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
import { InvoiceController } from 'controllers/InvoiceController.ts';
import { InvoiceId, InvoiceValidation } from 'validations/Invoice.ts';
import uploadMiddleware from 'server/configs/upload.ts';
import { storeRouter } from 'server/api/routes/store.ts';
import { ImportController } from 'controllers/ImportController.ts';
import { ImportValidation } from 'validations/ImportValidation.ts';
import { importRoute } from 'server/api/routes/import.ts';

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
apiRouter.route('/branch/:branchId/qrcode').post(
  ...authChain,
  permissionMiddleware([BranchPermission.ALL, BranchPermission.UPDATE]),
  uploadMiddleware(
    { mimetype: /image/ },
    {
      fileSize: 1024 * 1024 * 10, // 10MB file size limit
    }).single('image'),
  BranchController.uploadQRCode
)
apiRouter.route('/branch/:branchId/qrcode').get(
  ...authChain,
  permissionMiddleware([BranchPermission.ALL, BranchPermission.UPDATE]),
  BranchController.getQRCode
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
apiRouter.route('/consumer/:branchId/delete/:consumerId').delete(
  ...authChain,
  validateParams(ConsumerValidation.getConsumerParam),
  validateParams(ConsumerValidation.deleteConsumer),
  ConsumerController.deleteConsumer);
apiRouter.route('/consumer/:branchId/reward-point/:consumerId').get(
  ...authChain,
  validateParams(ConsumerValidation.consumerIdParam),
  ConsumerController.getConsumerRewardPoint);

// Membership routes
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
  validateParams(BranchValidation.branchIdParam),
  validateQuery(PaginationValidation.paginationQuery, ProductValidation.getStoreProductQuery),
  ProductController.getProducts);
apiRouter.route('/product/:branchId').post(
  ...authChain,
  validateParams(BranchValidation.branchIdParam),
  validateBody(ProductValidation.createProduct),
  ProductController.createProduct);
apiRouter.route('/product/:branchId/delete/:productId').delete(
  ...authChain,
  validateParams(BranchValidation.branchIdParam),
  validateParams(ProductValidation.deleteProductParams),
  ProductController.deleteProduct);
// Product upload image
apiRouter.route('/product/:branchId/upload/image').post(
  ...authChain,
  uploadMiddleware(
    { mimetype: /image/ },
    {
        fileSize: 1024 * 1024 * 10, // 10MB file size limit
    }).single('image'),
  validateParams(BranchValidation.branchIdParam),
  ProductController.uploadImage);


// Provider routes
apiRouter.route('/provider/:branchId').get(
  ...authChain,
  validateQuery(PaginationValidation.paginationQuery),
  ProviderController.getProviders);


// Invoice routes
apiRouter.route('/invoice/:branchId').get(
  ...authChain,
  validateParams(BranchValidation.branchIdParam),
  validateQuery(PaginationValidation.paginationQuery),
  InvoiceController.getInvoices);
apiRouter.route('/invoice/:branchId').post(
  ...authChain,
  validateParams(BranchValidation.branchIdParam),
  validateBody(InvoiceValidation.createInvoice),
  InvoiceController.createInvoice);
apiRouter.route('/invoice/:branchId/update/:invoiceId').post(
  ...authChain,
  validateParams(BranchValidation.branchIdParam),
  validateParams(InvoiceValidation.invoiceId),
  validateBody(InvoiceValidation.updateInvoice),
  InvoiceController.updateInvoice);
apiRouter.route('/invoice/:branchId/delete/:invoiceId').delete(
  ...authChain,
  validateParams(BranchValidation.branchIdParam),
  validateParams(InvoiceValidation.invoiceId),
  InvoiceController.deleteInvoice);

// Store routes
apiRouter.use(storeRouter);
apiRouter.use(importRoute);

export default {
    apiRoutes: apiRouter,
    pageRoutes: pageRouter
};