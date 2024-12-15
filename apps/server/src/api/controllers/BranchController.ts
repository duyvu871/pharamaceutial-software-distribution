import AsyncMiddleware from 'utils/asyncHandler.ts';
import { CreateBranchType } from 'web/src/schemas/branch-schema.ts';
import Unauthorized from 'responses/clientErrors/Unauthorized.ts';
import { UserTask } from 'server/repository/user';
import Success from 'responses/successful/Success.ts';
import type { Request } from 'express';
import { BranchTask } from 'server/repository/branch';
import Forbidden from 'responses/clientErrors/Forbidden.ts';
import { GetBranchesQuery } from 'validations/Branch.ts';

export class BranchController {
	public static createBranch = AsyncMiddleware.asyncHandler(
		async (req: Request<any, any, any, CreateBranchType>, res) => {
			try {
				const userId = req.jwtPayload?.id;
				if (!userId) {
					throw new Unauthorized('UNAUTHORIZED', 'access token is required', 'access token is required');
				}

				const branch = await UserTask.createBranch(req.body, userId);
				const response = new Success(branch).toJson;
				return res.status(200).json(response).end();

			} catch (error :any) {
				throw error;
			}
		}
	)

	public static getBranch = AsyncMiddleware.asyncHandler(
		async (req: Request<any, any, any, GetBranchesQuery>, res) => {
			try {
				const userId = req.jwtPayload?.id;
				const branchId = req.query.branch_id;
				if (!userId) {
					throw new Unauthorized('UNAUTHORIZED', 'access token is required', 'access token is required');
				}

				const branch = await BranchTask.getBranch(userId, branchId);
				if (!branch) {
					throw new Forbidden('forbidden_branch', 'Branch not found', 'Chi nhánh không tồn tại');
				}
				const response = new Success(branch).toJson;
				return res.status(200).json(response).end();

			} catch (error :any) {
				throw error;
			}
		}
	)
}