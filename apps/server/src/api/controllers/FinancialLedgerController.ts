import AsyncMiddleware from 'utils/asyncHandler.ts';
import {Response, Request} from 'express';
import { transformExpressParamsForPrisma } from 'server/shared/pagination-parse.ts';
import prisma from 'repository/prisma.ts';
import Success from 'responses/successful/Success.ts';
import { toLowerCaseNonAccentVietnamese } from 'utils/non-acent-vietnam.ts';
import { BranchIdParam } from 'validations/Branch.ts';
import { PaginationQueryV2 } from 'validations/Pagination.ts';
import { CreationFinancialLedger } from 'validations/FinancialLedger.ts';

export class FinancialLedgerController {
	public static getFinancialLedgers = AsyncMiddleware.asyncHandler(
		async (req: Request<BranchIdParam, any, any, PaginationQueryV2>, res: Response) => {
			try {
				const branchId = req.params.branchId;
				const protectAttributes = ["branch_id"];
				const queryParse = transformExpressParamsForPrisma("financial_ledger", req.query, prisma);
				console.log(queryParse);
				const total = await prisma.financial_ledger.count({
					where: {
						branch_id: branchId,
						...queryParse.where,
					},
				});
				const doctors = await prisma.financial_ledger.findMany({
					...queryParse,
					where: {
						branch_id: branchId,
						...queryParse.where,
					},
				});
				const response = new Success({
					data: doctors,
					total,
					page: Number(req.query.page),
					totalPage: Math.ceil(total / Number(req.query.limit || 10)),
				}).toJson;

				res.status(200).json(response).end();
			} catch (error) {
				throw error;
			}
		}
	)

	public static upsertFinancialLedger = AsyncMiddleware.asyncHandler(
		async (req: Request<BranchIdParam, any, CreationFinancialLedger>, res: Response) => {
			try {
				const branchId = req.params.branchId;
				const doctor = req.body;
				const {id, ...data} = doctor;
				const jwtPayload = req.jwtPayload;

				const userId = jwtPayload?.id as string;
				const userType = jwtPayload?.type as "MEMBERSHIP" | "USER" | "ADMIN";

				let response;
				if (id) {
					response = await prisma.financial_ledger.update({
						where: {
							id,
							branch_id: branchId,
						},
						data: {
							...data,
						},
					})
				} else {
					const count = await prisma.financial_ledger.count({
						where: {
							branch_id: branchId,
						},
					});
					response = await prisma.financial_ledger.create({
						data: {
							...data,
							maPhieu: "HDTC" + (count + 1).toString().padStart(6, "0"),
							branch_id: branchId,
							soQuyID: "SQ" + (count + 1).toString().padStart(6, "0"),
							loai_chung_tu: 1,
							ten_loai_thu_chi: data.loai_thu_chi === 0 ? "Thu" : "Chi",
							loai_nguoi_nop_nhan: 1, // 1: nộp
							nguoi_nop_nhan_id: 1, // 1: nộp
							ton_quy_truoc: 0,
							ton_quy_sau: 0,
							trang_thai: "approved",
							phuong_thuc_thanh_toan_id: data.phuong_thuc_thanh_toan,
							user_id: userId,
							user_type: userType,
						},
					});
				}

				const returnResponse = new Success(response).toJson

				res.status(200).json(returnResponse).end();
			} catch (error) {
				throw error;
			}
		}
	)
}