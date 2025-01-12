import AsyncMiddleware from 'utils/asyncHandler.ts';
import { Response, Request } from 'express';
import { BranchIdParam } from 'validations/Branch.ts';
import { UploadService } from 'services/UploadService.ts';
import BadRequest from 'server/responses/clientErrors/BadRequest';
import Success from 'server/responses/successful/Success';
import { UploadTypeQuery } from 'validations/Upload.ts';

export class UploadController {
	public static uploadImage = AsyncMiddleware.asyncHandler(
		async (req: Request<BranchIdParam, any, any, UploadTypeQuery>, res: Response) => {
			 try {
				const { file, jwtPayload } = req;
				const { branchId } = req.params;
				const { type } = req.query;

				if (!file) {
					throw new BadRequest('BAD_REQUEST', 'Image is required', 'Image is required');
				}

				if (!jwtPayload) {
					throw new BadRequest('BAD_REQUEST', 'JWT payload is required', 'JWT payload is required');
				}

				const upload = await UploadService.uploadImage(file, branchId, type, jwtPayload);
				const response = new Success(upload).toJson;

				return res.status(200).json(response).end();
			} catch (error) {
				console.error(`Error uploading image: ${error.message}`);
				throw error;
			}
		}
	)
}