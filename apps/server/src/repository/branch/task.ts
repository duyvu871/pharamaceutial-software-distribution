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
					stores: {
						create: {
							store_name: branchInit.branch_name,
							address: branchInit.address,
							store_reward_point: {
								create: {
									convert_to: 'VND',
									convert_rate: 100000,
									point_value: 5000,
									status: 1
								}
							}
						}
					}
				}
			});
		} catch (error) {
			throw error;
		}
	}

	public static async findBranch(branchId: string) {
		try {
			const query = await prisma.branches.findUnique({
				where: { branch_id: branchId },
				include: {
					stores: {
						include: {
							store_group: {
								take: 1
							},
							store_reward_point: {
								take: 1
							},
							store_assets: {
								include: {
									asset: true
								},
								take: 1,
								orderBy: {
									createdAt: 'desc'
								}
							}
						},
						take: 1
					}
				}
			});

			if (!query) return query;


			const {stores, ...branch} = query;
			const {store_group, store_reward_point, store_assets, ...store} = stores[0];

			const bindResponse = {
				...branch,
				store: {
					...store,
					store_group: store_group[0],
					store_reward_point: store_reward_point[0],
					store_asset: store_assets[0]
				}
			};

			return bindResponse;
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