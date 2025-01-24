import AsyncMiddleware from 'utils/asyncHandler.ts';
import { Request, Response } from 'express';
import { BranchIdParam } from 'validations/Branch.ts';
import { ImportProductBody } from 'validations/ImportValidation.ts';
import { ImportInvoiceTask } from 'repository/transaction/import-invoice/task.ts';
import Success from 'responses/successful/Success.ts';
import prisma from 'repository/prisma.ts';
import Forbidden from 'responses/clientErrors/Forbidden.ts';
import { benchmarkAsync, withBenchmark } from 'server/shared/benchmark.ts';
import { InvoiceAttribute } from 'repository/transaction/import-invoice/schema.ts';
import BadRequest from 'responses/clientErrors/BadRequest.ts';
import {import_invoices, import_invoice_product} from "@prisma/client"
import { PaginationQueryV2 } from 'validations/Pagination.ts';
import { transformExpressParamsForPrisma } from 'server/shared/pagination-parse.ts';
import { ProductIdParam } from 'validations/Product.ts';
import { FinancialLedgerService } from 'services/FinancialLedgerService.ts';
import { FinancialLedgerStatus, FinancialLedgerType } from 'server/common/enums/model/financial-ledger.ts';
import { FinancalLedgerPaymentMethod } from 'web/src/types/enum/financal.ts';

export class ImportController {
	public static importProduct = AsyncMiddleware.asyncHandler(
		async (req: Request<BranchIdParam, any, ImportProductBody>, res: Response) => {
			try {
				console.log('params: ', req.params);
				console.log('import product: ', req.body);
				const branchId = req.params.branchId;
				const jwtPayload = req.jwtPayload;
				if (!jwtPayload) {
					throw new Forbidden('jwt_payload_not_found', 'Không tìm thấy thông tin người dùng', 'Không tìm thấy thông tin người dùng');
				}

				const store = await prisma.stores.findFirst({
					select: {
						id: true
					},
					where: {
						branch_id: branchId
					}
				});

				if (!store) {
					throw new Forbidden('store_not_found', 'Kho không tồn tại', 'Kho không tồn tại');
				}

				const store_id = store.id;
				// TODO: Implement filter request body, before sending to the task
				const task = await benchmarkAsync(ImportInvoiceTask.importInvoices)(store_id, req.body)

				// Create financial ledger for the import task
				const financialLedger = await FinancialLedgerService.createFinancialLedger(
					branchId,
					{
						ten_nguoi_nop_nhan: 'Nhập hàng từ nhà cung cấp',
						loai_thu_chi: FinancialLedgerType.EXPENSE_FROM_PROVIDER,
						gia_tri: task.total_amount,
						phuong_thuc_thanh_toan: FinancalLedgerPaymentMethod.cash,
						trang_thai: FinancialLedgerStatus.APPROVED,
					},
					{userType: jwtPayload.type, id: jwtPayload.id}
				);

				const response = new Success({
					...task
				});
				response.message('Nhập hàng thành công');

				return res.status(200).send(response.toJson).end();
			} catch (error) {
				console.log('error: ', error);
				throw error;
			}
		}
	);

	public static getImportProductList = AsyncMiddleware.asyncHandler(
		async (req: Request<BranchIdParam, any, any, { page: string, limit: string, orderBy: string, search: string }>, res: Response) => {
			try {

				const { branchId } = req.params;
				const { page = '1', limit = '10', orderBy = 'createdAt:ASC', search } = req.query;
				const parsedPage = parseInt(page, 10);
				const parsedLimit = parseInt(limit, 10);
				const offset = (parsedPage - 1) * parsedLimit;
				const validColumns = ['createdAt', 'updatedAt', 'customerName', 'totalPrice']; // Define allowed columns

				const store = await prisma.stores.findFirst({
					select: {
						id: true
					},
					where: {
						branch_id: branchId
					}
				});

				if (!store) {
					throw new Forbidden('store_not_found', 'Kho không tồn tại', 'Kho không tồn tại');
				}

				const store_id = store.id;

				const orders = orderBy.split(',').map((order) => {
					const [column, direction] = order.split(':') as [keyof import_invoices, 'ASC' | 'DESC'];
					if (!validColumns.includes(column) || !['ASC', 'DESC'].includes(direction)) {
						throw new BadRequest('invalid_order_by', 'Invalid orderBy parameter', 'Invalid orderBy parameter');
					}
					return { [column]: direction.toLowerCase() };
				});

				const importProducts = await prisma.import_invoices.findMany({
					where: {
						store_id: store_id
					},
					take: parsedLimit,
					skip: offset,
					orderBy: orders,
					include: {
						import_invoice_product: {
							include: {
								product: true
							}
						},
						providers: true
					},
				});

				const count = await prisma.import_invoices.count();

				const response = new Success({
					count: count,
					data: importProducts
				});
				response.message('Lấy danh sách nhập hàng thành công');

				return res.status(200).send(response.toJson).end();
			} catch (error) {
				console.log('error: ', error);
				throw error;
			}
		}
	)

	public static getImportByProduct = AsyncMiddleware.asyncHandler(
		async (req: Request<BranchIdParam & ProductIdParam, any, any, PaginationQueryV2>, res: Response) => {
			try {
				const branchId = req.params.branchId;
				const productId = req.params.productId;
				const protectAttributes = ["branch_id"];

				const product = await prisma.products.findFirst({
					select: {
						id: true
					},
					where: {
						id: productId,
						stores: {
							branch_id: branchId
						}
					}
				});

				if (!product) {
					throw new Forbidden('product_not_found', 'Sản phẩm không tồn tại', 'Sản phẩm không tồn tại');
				}

				const queryParse = transformExpressParamsForPrisma("import_invoice_product", req.query, prisma);

				console.log(queryParse);
				const total = await prisma.import_invoice_product.count({
					where: {
						...queryParse.where,
						product_id: productId,
					},
				});
				const doctors = await prisma.import_invoice_product.findMany({
					...queryParse,
					where: {
						...queryParse.where,
						product_id: productId,
					},
					include: {
						product: {
							select: {
								product_name: true,
								id: true,
							}
						}
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
				console.log('error: ', error);
				throw error;
			}
		}
	)
}