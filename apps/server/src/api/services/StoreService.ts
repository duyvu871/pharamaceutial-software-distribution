import prisma from 'repository/prisma.ts';
import { branches } from '@prisma/client';

export class StoreService {
	public static async createStore(branch: ConditionalRequired<Partial<branches>, "branch_id">) {
		try {
			return await prisma.stores.create({
				data: {
					branch_id: branch.branch_id,
					store_name: branch.branch_name || '',
					address: branch.address || '',
					created_at: new Date(),
					updated_at: new Date(),
				},
			});
		} catch (error: any) {
			throw error;
		}
	}
}