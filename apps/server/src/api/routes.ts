import { Router } from "express";
import { validateBody, validateHeader, validateQuery } from 'middlewares/ValidateRequest';
import { AuthorizationValidation } from 'validations/Authorization';
import { AuthController } from 'controllers/AuthController';
import { SearchProductValidation } from "./validations/SearchProduct";
import { SearchProduct } from "./controllers/SearchController";

const apiRouter = Router();
const pageRouter = Router();

apiRouter.route('/auth/login').post(validateBody(AuthorizationValidation.login), AuthController.login);
apiRouter.route('/auth/register').post(validateBody(AuthorizationValidation.register), AuthController.register);
apiRouter.route('/auth/refresh').post(validateBody(AuthorizationValidation.refreshToken), AuthController.refreshToken);
apiRouter.route('/auth/verify-session').post(validateHeader(AuthorizationValidation.verifySession), AuthController.verifySession);
apiRouter.route('/product/search').get(validateQuery(SearchProductValidation.SearchInput), SearchProduct.search);


export default {
    apiRoutes: apiRouter,
    pageRoutes: pageRouter
};