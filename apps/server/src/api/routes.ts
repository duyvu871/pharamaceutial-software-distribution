import { Router, Request, Response } from "express";
import { validateBody, validateHeader } from 'middlewares/ValidateRequest';
import { AuthorizationValidation } from 'validations/Authorization';
import { AuthController } from 'controllers/AuthController';
import { SearchProduct } from "./controllers/RedisController";

const apiRouter = Router();
const pageRouter = Router();

apiRouter.route('/auth/login').post(validateBody(AuthorizationValidation.login), AuthController.login);
apiRouter.route('/auth/register').post(validateBody(AuthorizationValidation.register), AuthController.register);
apiRouter.route('/auth/refresh').post(validateBody(AuthorizationValidation.refreshToken), AuthController.refreshToken);
apiRouter.route('/auth/verify-session').post(validateHeader(AuthorizationValidation.verifySession), AuthController.verifySession);
apiRouter.route('/api/search').post(validateBody(AuthorizationValidation.verifySession), SearchProduct);


export default {
    apiRoutes: apiRouter,
    pageRoutes: pageRouter
};