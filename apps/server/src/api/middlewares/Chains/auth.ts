import { validateHeader } from 'middlewares/ValidateRequest.ts';
import { AuthorizationValidation } from 'validations/Authorization.ts';
import JsonWebToken from 'middlewares/JsonWebToken.ts';

export const authChain = [validateHeader(AuthorizationValidation.headers), JsonWebToken,]