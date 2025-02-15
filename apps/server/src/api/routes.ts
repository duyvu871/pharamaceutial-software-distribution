import { Router } from "express";
import { validateBody, validateHeader, validateParams, validateQuery } from 'middlewares/ValidateRequest';
import permissionMiddleware from 'middlewares/PermissionMiddleware';
import uploadMiddleware from 'server/configs/upload.ts';
import { AuthorizationValidation } from 'validations/Authorization';
import { AuthController } from 'controllers/AuthController';
import JsonWebToken from 'middlewares/JsonWebToken';
import { UserController } from 'controllers/UserController';
import { UserValidation } from 'validations/User';
import { BranchValidation } from 'validations/Branch';
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
import { InvoiceValidation } from 'validations/Invoice.ts';
import { storeRouter } from 'server/api/routes/store.ts';
import { importRoute } from 'server/api/routes/import.ts';
import { uploadRouter } from 'server/api/routes/upload.ts';
import { ProviderValidation } from 'validations/Provider.ts';
import { doctorRoute } from 'server/api/routes/doctor.ts';
import { financialLedger } from 'server/api/routes/financial-ledger.ts';
import { adminRoute } from 'server/api/routes/admin.ts';
import { subscriptionRoute } from 'server/api/routes/subscription.ts';
import { healthCheckRouter } from 'server/api/routes/health.ts';

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
apiRouter.route('/user/profile').post(
  ...authChain,
  validateBody(UserValidation.updateProfile),
  UserController.updateProfile);
apiRouter.route('/user/reset-password').post(
  ...authChain,
  validateBody(UserValidation.resetPassword),
  UserController.resetPassword);

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
  uploadMiddleware(
    { mimetype: /image/ },
    {
      fileSize: 1024 * 1024 * 10, // 10MB file size limit
    }).single('image'),
  ...authChain,
  permissionMiddleware([BranchPermission.ALL, BranchPermission.UPDATE]),
  BranchController.uploadQRCode
)
apiRouter.route('/branch/:branchId/qrcode').get(
  ...authChain,
  permissionMiddleware([BranchPermission.ALL, BranchPermission.UPDATE]),
  BranchController.getQRCode
)
apiRouter.route('/branch/:branchId/upsert-integration').post(
  ...authChain,
  validateParams(BranchValidation.branchIdParam),
  validateBody(BranchValidation.upsertBranchIntegrationBody),
  BranchController.upsertBranchIntegration);
apiRouter.route('/branch/:branchId/get-integration').get(
  ...authChain,
  validateParams(BranchValidation.branchIdParam),
  BranchController.getBranchIntegration);
apiRouter.route('/branch/:branchId/upsert-payment').post(
  ...authChain,
  validateParams(BranchValidation.branchIdParam),
  validateBody(BranchValidation.upsertPaymentBody),
  BranchController.upsertPaymentIntegration
);
apiRouter.route('/branch/:branchId/get-payment').get(
  ...authChain,
  validateParams(BranchValidation.branchIdParam),
  BranchController.getPaymentIntegration
);
apiRouter.route('/branch/:branchId/upsert-reward-point').post(
  ...authChain,
  validateParams(BranchValidation.branchIdParam),
  validateBody(BranchValidation.upsertBranchRewardPointBody),
  BranchController.upsertBranchRewardPoint
);
apiRouter.route('/branch/:branchId/upsert-pharmacy-detail').post(
  ...authChain,
  validateParams(BranchValidation.branchIdParam),
  validateBody(BranchValidation.upsertPharmacyDetailBody),
  BranchController.upsertPharmacyDetail
)
apiRouter.route('/branch/:branchId/get-pharmacy-detail').get(
  ...authChain,
  validateParams(BranchValidation.branchIdParam),
  BranchController.getPharmacyDetail
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
apiRouter.route('/product/:branchId/get').get(
  ...authChain,
  validateParams(BranchValidation.branchIdParam),
  validateQuery(PaginationValidation.paginationQueryV2),
  ProductController.getProductV2);
apiRouter.route('/product/:branchId/get/:productType').get(
  ...authChain,
  validateParams(BranchValidation.branchIdParam, ProductValidation.productType),
  validateQuery(PaginationValidation.paginationQuery),
  ProductController.getProductV2);
apiRouter.route('/product/:branchId').post(
  ...authChain,
  validateParams(BranchValidation.branchIdParam),
  validateBody(ProductValidation.createProduct),
  ProductController.createProduct);
apiRouter.route('/product/:branchId/update/:productId').post(
  ...authChain,
  validateParams(BranchValidation.branchIdParam, ProductValidation.productIdParams),
  validateBody(ProductValidation.updateProduct),
  ProductController.updateProduct);
apiRouter.route('/product/:branchId/delete/:productId').delete(
  ...authChain,
  validateParams(BranchValidation.branchIdParam),
  validateParams(ProductValidation.deleteProductParams),
  ProductController.deleteProduct);
// Product upload image
apiRouter.route('/product/:branchId/upload/image').post(
  uploadMiddleware(
    { mimetype: /image/ },
    {
      fileSize: 1024 * 1024 * 10, // 10MB file size limit
    }).single('image'),
  ...authChain,
  validateParams(BranchValidation.branchIdParam),
  ProductController.uploadImage);


// Provider routes
apiRouter.route('/provider/:branchId').get(
  ...authChain,
  validateParams(BranchValidation.branchIdParam),
  validateQuery(PaginationValidation.paginationQuery),
  ProviderController.getProviders);
apiRouter.route('/provider/:branchId').post(
  ...authChain,
  validateParams(BranchValidation.branchIdParam),
  validateBody(ProviderValidation.createProvider),
  ProviderController.createProvider);


// Invoice routes
apiRouter.route('/invoice/:branchId').get(
  ...authChain,
  validateParams(BranchValidation.branchIdParam),
  validateQuery(PaginationValidation.paginationQuery),
  InvoiceController.getInvoices);
apiRouter.route('/invoice/:branchId/prescription').get(
  ...authChain,
  validateParams(BranchValidation.branchIdParam),
  validateQuery(PaginationValidation.paginationQuery),
  InvoiceController.getInvoicesPrescription
);
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
apiRouter.use(healthCheckRouter);
apiRouter.use(storeRouter);
apiRouter.use(importRoute);
apiRouter.use(uploadRouter);
apiRouter.use(doctorRoute);
apiRouter.use(financialLedger);
apiRouter.use(adminRoute);
apiRouter.use(subscriptionRoute);

export default {
    apiRoutes: apiRouter,
    pageRoutes: pageRouter
};