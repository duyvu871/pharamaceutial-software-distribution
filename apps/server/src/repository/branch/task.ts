import { BranchSchema } from 'server/repository/branch';
import type { BranchAttributes } from 'server/repository/branch/schema';
import { UserSchema } from 'server/repository/user';

export class BranchTask {

	public static async createBranch(ownerId: string, branchInit: BranchAttributes) {
		try {
			const user = await UserSchema.findByPk(ownerId);
			if (!user) throw new Error('User not found');
			return await BranchSchema.create({
				...branchInit,
				owner_id: ownerId,
			});
		} catch (error) {
			throw error;
		}
	}

	public static async updateBranch(branchId: string, branchUpdate: Partial<BranchAttributes>) {
		try {
			const branch = await BranchSchema.findByPk(branchId);
			if (!branch) throw new Error('Branch not found');
			return await branch.update(branchUpdate);
		} catch (error) {
			throw error;
		}
	}
	// get branch by branch id
	public static async getBranch(userId: string, branchId: string) {
		try {
			const branch = await BranchSchema.findByPk(branchId);
			if (!branch) return null;
			if (branch.owner_id !== userId) return null;
			return branch;
		} catch (error) {
			throw error;
		}
	}
	// get all branches by owner id
	public static async getBranchesByOwner(ownerId: string) {
		try {
			return await BranchSchema.findAll({
				where: { owner_id: ownerId },
				order: [['createdAt', 'DESC']], // order by created_at desc
			});

		} catch (error) {
			throw error;
		}
	}
}