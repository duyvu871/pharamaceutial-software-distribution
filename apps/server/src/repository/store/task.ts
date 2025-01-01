import { StoreAttributes } from 'repository/store/schema.ts';
import prisma from 'repository/prisma.ts';

export class StoreTask {
	public static getStoreFromBranch = async (branchId: string): Promise<StoreAttributes | null> => {
		return prisma.stores.findFirst({
			where: {
				branch_id: branchId
			}
		})
	}
}