import AsyncMiddleware from "server/utils/asyncHandler";
import { Request } from "express";
import { StoreGroupTask } from 'repository/group/store_group/task.ts';
import { BranchIdParam } from 'validations/Branch.ts';
import { StoreTask } from 'repository/store/task.ts';
import Success from 'responses/successful/Success.ts';

export class StoreController {
		public static getStoreGroups = AsyncMiddleware.asyncHandler(
			async (req: Request<BranchIdParam, any, any, any>, res) => {
				try {
					const branchId = req.params.branchId;
					const storeFromBranch = await StoreTask.getStoreFromBranch(branchId);
					const storeId = storeFromBranch?.id;
					if (!storeId) {
						return res.status(200).json(new Success([]).toJson).end();
					}
					const stores = await StoreGroupTask.getStoreGroups(storeId);
					const response = new Success(stores).toJson;
					return res.status(200).json(response).end();
				} catch (error) {
					throw error;
				}
			}
		);

}