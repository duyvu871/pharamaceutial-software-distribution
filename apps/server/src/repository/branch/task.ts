import type { BranchAttributes } from 'server/repository/branch/schema';
import { UserTask } from 'repository/user';
import prisma from 'repository/prisma';

export class BranchTask {

	public static async createBranch(ownerId: string, branchInit: BranchAttributes) {
		try {
			await UserTask.throwErrorIfUserNotExist(ownerId);
			return await prisma.branches.create({
				data: {
					...branchInit,
					owner_id: ownerId,
				}
			});
		} catch (error) {
			throw error;
		}
	}

	public static async findBranch(branchId: string) {
		try {
			return await prisma.branches.findUnique({
				where: { branch_id: branchId }
			});
		} catch (error) {
			console.log(error);
			return null;
		}
	}

	public static async updateBranch(branchId: string, branchUpdate: Partial<BranchAttributes>) {
		try {
			const branch = await this.findBranch(branchId);
			if (!branch) throw new Error('Branch not found');
			return await  prisma.branches.update({
				where: { branch_id: branchId },
				data: branchUpdate
			});
		} catch (error) {
			throw error;
		}
	}
	// get branch by branch id
	public static async getBranch(userId: string, branchId: string) {
		try {
			const branch = await this.findBranch(branchId);
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
			return await prisma.branches.findMany({
				where: { owner_id: ownerId },
				orderBy: { createdAt: 'desc' } // order by created date
			});

		} catch (error) {
			throw error;
		}
	}
}