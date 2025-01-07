import AsyncMiddleware from 'utils/asyncHandler.ts';
import { Request, Response } from 'express';
import { BranchIdParam } from 'validations/Branch.ts';
import { ImportProductBody } from 'validations/ImportValidation.ts';

export class ImportController {
	public static importProduct = AsyncMiddleware.asyncHandler(
		async (req: Request<BranchIdParam, any, any, ImportProductBody>, res: Response) => {
			try {
				console.log('params: ', req.params);
				console.log('import product: ', req.body);
			} catch (error) {
				console.log('error: ', error);
				throw error;
			}
		}
	);
}