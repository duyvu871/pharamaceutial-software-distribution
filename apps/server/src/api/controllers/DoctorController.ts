import { Request, Response } from 'express';
import AsyncMiddleware from 'utils/asyncHandler.ts';
import { BranchIdParam } from 'validations/Branch.ts';
import { PaginationQueryV2 } from 'validations/Pagination.ts';
import { transformExpressParamsForPrisma } from 'server/shared/pagination-parse.ts';
import prisma from 'repository/prisma';
import Success from 'responses/successful/Success.ts';
import { DoctorCreation, DoctorIdParam } from 'validations/Doctor.ts';
import { toLowerCaseNonAccentVietnamese } from 'utils/non-acent-vietnam.ts';

export default class DoctorController {
	public static getDoctors = AsyncMiddleware.asyncHandler(
		async (req: Request<BranchIdParam, any, any, PaginationQueryV2>, res: Response) => {
			try {
				const branchId = req.params.branchId;
				const protectAttributes = ["branch_id"];
				const queryParse = transformExpressParamsForPrisma("doctors", req.query, prisma);
				console.log(queryParse);
				const total = await prisma.doctors.count({
					where: {
						branch_id: branchId,
						...queryParse.where,
					},
				});
				const doctors = await prisma.doctors.findMany({
					...queryParse,
					where: {
						branch_id: branchId,
						...queryParse.where,
					},
					include: {
						invoice_prescriptions: {
							take: 10,
							include: {
								invoices: {
									include: {
										items: true
									}
								}
							}
						},
					}
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

	public static getDoctorInvoicePrescriptions = AsyncMiddleware.asyncHandler(
		async (req: Request<BranchIdParam & DoctorIdParam, any, any, PaginationQueryV2>, res: Response) => {
			try {
				const branchId = req.params.branchId;
				const doctorId = req.params.doctorId;
				const protectAttributes = ["branch_id"];
				const queryParse = transformExpressParamsForPrisma("invoice_prescriptions", req.query, prisma);
				const total = await prisma.invoice_prescriptions.count({
					where: {
						invoices: {
							branchId,
							doctor_id: doctorId,
						},
						...queryParse.where,
					},
				});
				const invoicePrescriptions = await prisma.invoice_prescriptions.findMany({
					...queryParse,
					where: {
						invoices: {
							branchId: branchId,
							doctor_id: doctorId,
						},
						...queryParse.where,
					},
				});
				const response = new Success({
					data: invoicePrescriptions,
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

	public static upsertDoctor = AsyncMiddleware.asyncHandler(
		async (req: Request<BranchIdParam, any, DoctorCreation>, res: Response) => {
			try {
				const branchId = req.params.branchId;
				const doctor = req.body;
				const {id, ...data} = doctor;

				let response;
				if (id) {
					response = await prisma.doctors.update({
							where: {
								id,
								branch_id: branchId,
							},
							data: {
								...data,
								ten_slug: toLowerCaseNonAccentVietnamese(data.ten_bac_si),
							},
						})
				} else {
					const count = await prisma.doctors.count({
						where: {
							branch_id: branchId,
						},
					});
					const nonAccentedName = toLowerCaseNonAccentVietnamese(data.ten_bac_si);
					response = await prisma.doctors.create({
						data: {
							...data,
							doctor_id: "BS" + (count + 1).toString().padStart(6, "0"),
							ten_slug: nonAccentedName,
							branch_id: branchId,
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

	public static exportDoctors = AsyncMiddleware.asyncHandler(
		async (req: Request<BranchIdParam, any, any, PaginationQueryV2>, res: Response) => {
			try {
				const branchId = req.params.branchId;
				const protectAttributes = ["branch_id"];
				const queryParse = transformExpressParamsForPrisma("doctors", req.query, prisma);
				const doctors = await prisma.doctors.findMany({
					...queryParse,
					where: {
						branch_id: branchId,
						...queryParse.where,
					},
				});
				const response = new Success(doctors).toJson;

				res.status(200).json(response).end();
			} catch (error) {
				throw error;
			}
		}
	)
}