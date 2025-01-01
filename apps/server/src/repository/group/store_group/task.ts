import { Prisma, store_group } from '@prisma/client';
import prisma from 'repository/prisma.ts';

export class StoreGroupTask {
	public static getStoreGroups(storeId: string): Promise<Prisma.store_groupGetPayload<any>[]> {
		return prisma.store_group.findMany({
			where: {
				store_id: storeId
			}
		})
	}
}