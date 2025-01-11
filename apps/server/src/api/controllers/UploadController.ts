import AsyncMiddleware from 'utils/asyncHandler.ts';
import { Response, Request } from 'express';

export class UploadController {
	public static uploadImage = AsyncMiddleware.asyncHandler(
		async (req: Request, res: Response) => {
			const {file} = req;
			const {branchId, type} = req.params;
		}
	)
}