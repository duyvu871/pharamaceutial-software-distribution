import AsyncMiddleware from 'utils/asyncHandler.ts';
// import { CreateBranchType } from 'web/src/schemas/branch-schema.ts';
import Unauthorized from 'responses/clientErrors/Unauthorized.ts';
import { UserTask } from 'server/repository/user';
import Success from 'responses/successful/Success.ts';
import type { Request, Response } from 'express';
import { BranchTask } from 'server/repository/branch';
import Forbidden from 'responses/clientErrors/Forbidden.ts';
import {
	BranchIdParam,
	CreateBranchBody,
	GetBranchesQuery,
	UpsertBranchIntegrationBody, UpsertBranchRewardPointBody,
	UpsertPaymentBody,
} from 'validations/Branch.ts';
import BadRequest from 'server/responses/clientErrors/BadRequest';
import path from 'node:path';
import config from 'config/app-config';
import fs from 'fs';
import { v4 as uuidv4 } from 'uuid';
import prisma from 'repository/prisma.ts';

export class BranchController {
	public static createBranch = AsyncMiddleware.asyncHandler(
		async (req: Request<any, any, any, CreateBranchBody>, res) => {
			try {
				const userId = req.jwtPayload?.id;
				if (!userId) {
					throw new Unauthorized('UNAUTHORIZED', 'access token is required', 'access token is required');
				}

				const branch = await UserTask.createBranch(req.body, userId);
				const response = new Success(branch).toJson;
				return res.status(200).json(response).end();

			} catch (error :any) {
				throw error;
			}
		}
	)

	public static getBranch = AsyncMiddleware.asyncHandler(
		async (req: Request<any, any, any, GetBranchesQuery>, res) => {
			try {
				const userId = req.jwtPayload?.id;
				const branchId = req.query.branch_id;
				if (!userId) {
					throw new Unauthorized('UNAUTHORIZED', 'access token is required', 'access token is required');
				}

				const branch = await BranchTask.getBranch(userId, branchId);
				if (!branch) {
					throw new Forbidden('forbidden_branch', 'Branch not found', 'Chi nhánh không tồn tại');
				}
				const response = new Success(branch).toJson;
				return res.status(200).json(response).end();

			} catch (error :any) {
				throw error;
			}
		}
	)

	public static uploadQRCode = AsyncMiddleware.asyncHandler(
		async (req: Request<BranchIdParam>, res: Response) => {
			try {
				const { branchId } = req.params;
				const { file: image, jwtPayload } = req;

				if (!image) {
					throw new BadRequest('invalid_file', 'Không có ảnh được upload', 'Invalid file');
				}

				const store = await prisma.stores.findFirst({
					where: { branch_id: branchId },
					select: { id: true }
				});

				if (!store) {
					throw new BadRequest('store_not_found', 'Store not found', 'Store not found');
				}
				const storeId = store.id;

				const imageOriginalName = image.originalname;
				const imageBuffer = image.buffer;
				const imageExtension = imageOriginalName.split('.').pop();

				if (!imageExtension) throw new BadRequest('invalid_file', 'Invalid file', 'Invalid file');

				const allowedExtensions = ['jpg', 'jpeg', 'png', 'gif'];

				if (!allowedExtensions.includes(imageExtension)) throw new BadRequest('invalid_file', 'Invalid file', 'Invalid file');


				const imagePath = `storage/image/product/${storeId}/${uuidv4()}.${imageExtension}`;
				const imageAbsolutePath = path.join(process.cwd(), imagePath);
				const mkdir = await fs.promises.mkdir(path.dirname(imageAbsolutePath), { recursive: true });

				// prisma.product_assets.create({})

				const tasks = await Promise.all([
					fs.promises.writeFile(imagePath, imageBuffer),
					prisma.assets.create({
						data: {
							name: imageOriginalName,
							type: image.mimetype,
							store_id: storeId,
							url: `${config.baseUrl}/storage/image/product/${storeId}/${path.basename(imagePath)}`,
							meta_data: {
								mime: image.mimetype,
								size: image.size,
								originalName: imageOriginalName,
								encoding: image.encoding,
								destination: `storage/image/product/${storeId}`,
							},
							path: imagePath,
							from: jwtPayload?.id ? `${jwtPayload.id}_${jwtPayload.type}` : null,
							createdAt: new Date(),
							updatedAt: new Date()
						},
					})
				])

				const result = tasks[1];

				const productAsset = await prisma.store_assets.create({
					data: {
						store_id: storeId,
						asset_id: result.id
					}
				})

				const response = new Success({
					...productAsset,
					asset: result
				}).toJson;

				return res.status(200).json(response).end();
			} catch (error: any) {
				console.error(`Error uploading image: ${error.message}`);
				throw error;
			}
		}
	)

	public static getQRCode = AsyncMiddleware.asyncHandler(
		async (req: Request<BranchIdParam>, res: Response) => {
			try {
				const { branchId } = req.params;

			}	catch (error) {
				console.error(`Error getting QR code: ${error.message}`);
				throw error;
			}
		}
	)

	public static upsertBranchIntegration = AsyncMiddleware.asyncHandler(
		async (req: Request<BranchIdParam, any, UpsertBranchIntegrationBody>, res: Response) => {
			try {
				const { branchId } = req.params;
				const { integration_account, integration_id, integration_password } = req.body;

				const upsertBranchIntegration = await prisma.branch_integration.upsert({
					where: {branch_id: branchId},
					update: {
						integration_account,
						integration_id,
						integration_password
					},
					create: {
						branch_id: branchId,
						integration_account,
						integration_id,
						integration_password,
						status: 1,
						type: 'branch'
					}
				});

				const response = new Success(upsertBranchIntegration).toJson;
				return res.status(200).json(response).end();
			} catch (error) {
				console.error(`Error upserting branch integration: ${error.message}`);
				throw error;
			}
		}
	)

	public static getBranchIntegration = AsyncMiddleware.asyncHandler(
		async (req: Request<BranchIdParam>, res: Response) => {
			try {
				const { branchId } = req.params;

				const branchIntegration = await prisma.branch_integration.findFirst({
					where: { branch_id: branchId }
				});

				const response = new Success(branchIntegration).toJson;
				return res.status(200).json(response).end();
			} catch (error) {
				console.error(`Error getting branch integration: ${error.message}`);
				throw error;
			}
		}
	)

	public static upsertPaymentIntegration = AsyncMiddleware.asyncHandler(
		async (req: Request<BranchIdParam, any, UpsertPaymentBody>, res: Response) => {
			try {
				const { branchId } = req.params;
				const { payment_account, payment_bank, payment_owner } = req.body;

				const upsertPayment = await prisma.branch_payment.upsert({
					where: { branch_id: branchId },
					update: {
						payment_account_number: payment_account,
						payment_bank,
						payment_account_owner: payment_owner
					},
					create: {
						type: 'branch',
						branch_id: branchId,
						payment_account_number: payment_account,
						payment_bank,
						payment_account_owner: payment_owner,
						status: 1
					}
				})

				const response = new Success(upsertPayment).toJson;
				return res.status(200).json(response).end();
			} catch (error) {
				console.error(`Error upserting payment integration: ${error.message}`);
				throw error;
			}
		}
	)

	public static getPaymentIntegration = AsyncMiddleware.asyncHandler(
		async (req: Request<BranchIdParam>, res: Response) => {
			try {
				const { branchId } = req.params;
				const paymentIntegration = await prisma.branch_payment.findFirst({ where: { branch_id: branchId } });
				const response = new Success(paymentIntegration).toJson;
				return res.status(200).json(response).end();
			} catch (error) {
				console.error(`Error getting payment integration: ${error.message}`);
				throw error;
			}
		}
	)

	public static upsertBranchRewardPoint = AsyncMiddleware.asyncHandler(
		async (req: Request<BranchIdParam, any, UpsertBranchRewardPointBody>, res: Response) => {
			try {
				const { branchId } = req.params;
				const { pointValue, applyPoints, conversionRate } = req.body;

				const store = await prisma.stores.findFirst({
					where: { branch_id: branchId },
					select: { id: true }
				});

				if (!store) {
					throw new Forbidden('store_not_found', 'Store not found', 'Store not found');
				}

				const storeId = store.id;

				const upsertRewardPoint = await prisma.store_reward_point.upsert({
					where: { store_id: storeId },
					update: {
						convert_rate: conversionRate,
						point_value: pointValue
					},
					create: {
						store_id: branchId,
						convert_rate: conversionRate,
						point_value: pointValue,
						status: 1
					}
				});

				const response = new Success(upsertRewardPoint).toJson;
				return res.status(200).json(response).end();
			} catch (error) {
				console.error(`Error upserting branch reward point: ${error.message}`);
				throw error;
			}
		}
	)
}