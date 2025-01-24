import { Prisma } from "@repo/orm";
import prisma from "repository/prisma";

export class BranchService {
	/*
	 * Get all branches
	 * @returns {Promise<Prisma.branches>}
	 */
	public static async createBranch(branch: Omit<Prisma.branchesCreateInput, "id">) {
		return prisma.branches.create({ data: branch, });
	}

	/*
	 * Get all branches
	 * @returns {Promise<Prisma.branches[]>}
	 */
	public static async getBranches() {
		return prisma.branches.findMany();
	}

	/*
	 * Get branch by id
	 * @param {string}
	 * @returns {Promise<Prisma.branches>}
	 */
	public static async getBranchById(branchId: string) {
		return prisma.branches.findUnique({ where: { branch_id: branchId }, });
	}

}