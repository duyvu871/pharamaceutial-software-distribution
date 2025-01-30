import { Prisma } from '@prisma/client';
import prisma from 'repository/prisma';
import { UpsertBranchIntegrationBody, UpsertPharmacyDetailBody } from 'validations/Branch.ts';

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

	public static async upsertBranchIntegration(branchId: string, integration: Partial<UpsertBranchIntegrationBody>) {
		try {

			const { integration_account, integration_id, integration_password } = integration;

			return await prisma.branch_integration.upsert({
				where: { branch_id: branchId },
				update: {
					integration_account,
					integration_id,
					integration_password
				},
				create: {
					branch_id: branchId,
					integration_account: integration_account || "",
					integration_id: integration_id || "",
					integration_password: integration_password || "",
					status: 1,
					type: 'branch'
				}
			});
		} catch (error) {
			throw error;
		}
	}

	public static async upsertBranchDetail(branchId: string, branch: Partial<UpsertPharmacyDetailBody>) {
		try {
			const {
				so_dang_ky,
				ten_nha_thuoc,
				loai_hinh,
				tinh,
				huyen,
				dia_chi,
				nguoi_dai_dien,
				nguoi_chiu_trach_nhiem,
				nguoi_chiu_trach_nhiem_chuyen_mon,
				so_chung_chi_hanh_nghe,
			} = branch;

			return await prisma.branch_details.upsert({
				where: { branch_id: branchId },
				update: {
					so_dang_ky,
					ten_nha_thuoc,
					loai_hinh,
					tinh,
					huyen,
					dia_chi,
					nguoi_dai_dien,
					nguoi_chiu_trach_nhiem,
					nguoi_chiu_trach_nhiem_chuyen_mon,
					so_chung_chi_hanh_nghe,
				},
				create: {
					branch_id: branchId,
					so_dang_ky: so_dang_ky || "",
					ten_nha_thuoc: ten_nha_thuoc || "",
					loai_hinh: loai_hinh || "",
					tinh: tinh || "",
					huyen: huyen || "",
					dia_chi: dia_chi || "",
					nguoi_dai_dien: nguoi_dai_dien || "",
					nguoi_chiu_trach_nhiem: nguoi_chiu_trach_nhiem || "",
					nguoi_chiu_trach_nhiem_chuyen_mon: nguoi_chiu_trach_nhiem_chuyen_mon || "",
					so_chung_chi_hanh_nghe: so_chung_chi_hanh_nghe || "",
				}
			});
		} catch (error) {
			console.error(`Error upserting pharmacy detail: ${error.message}`);
			throw error;
		}
	}
}