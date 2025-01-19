import { Request, Response } from 'express';
import AsyncMiddleware from 'utils/asyncHandler';
import Success from 'responses/successful/Success';
import BadRequest from 'responses/clientErrors/BadRequest';
import prisma from 'repository/prisma.ts';
import { Prisma, PrismaClient } from '@repo/orm';
import { BranchIdParam } from 'validations/Branch.ts';
import { InvoiceAttribute } from 'repository/transaction/import-invoice/schema.ts';
import { CreateInvoice } from 'validations/Invoice.ts';
import { SalesInvoiceTask } from 'repository/transaction/sales-invoice/task.ts';
import { PaginationQueryV2 } from 'validations/Pagination.ts';
import { transformExpressParamsForPrisma } from 'server/shared/pagination-parse.ts';

export class InvoiceController {
	public static getInvoices = AsyncMiddleware.asyncHandler(
		async (req: Request<BranchIdParam, any, any, { page: string, limit: string, orderBy: string, search: string }>, res: Response) => {
			try {
				const { branchId } = req.params;
				const { page = '1', limit = '10', orderBy = 'createdAt:ASC', search } = req.query;
				const parsedPage = parseInt(page, 10);
				const parsedLimit = parseInt(limit, 10);
				const offset = (parsedPage - 1) * parsedLimit;
				const validColumns = ['createdAt', 'updatedAt', 'customerName', 'totalPrice']; // Define allowed columns
				// const orders = orderBy.split(',').map((order) => {
				// 	const [column, direction] = order.split(':') as [keyof InvoiceAttribute, 'ASC' | 'DESC'];
				// 	if (!validColumns.includes(column) || !['ASC', 'DESC'].includes(direction)) {
				// 		throw new BadRequest('invalid_order_by', 'Invalid orderBy parameter', 'Invalid orderBy parameter');
				// 	}
				// 	return [column, direction];
				// }) as [keyof InvoiceAttribute, 'ASC' | 'DESC'][];
				//
				// let conditions = [Prisma.sql`"branchId" = ${branchId}::uuid`];
				// if (search) {
				// 	conditions.push(
				// 		// Prisma.sql`to_tsvector('english', customerName || ' ' || COALESCE(notes, '')) @@ to_tsquery('english', ${search})`
				// 		Prisma.sql`("customerName" ILIKE ${`%${search}%`})`
				// 	);
				// }
				//
				// const whereClause = conditions.length ? Prisma.sql`WHERE ${Prisma.join(conditions, ' AND ')}` : Prisma.empty;
				// const orderParse = orders
				// 	.map((order) => `"${order[0]}" ${order[1].toUpperCase()}`)
				// 	.join(', ');
				// const orderBySql = Prisma.sql([orderParse]);
				//
				// const query = Prisma.sql`
        //     SELECT *
        //     FROM invoices
        //         ${whereClause}
        //     ORDER BY ${orderBySql}
        //         LIMIT CAST(${limit} AS bigint)
        //     OFFSET CAST(${offset} AS bigint)
    		// `;
				//
				// const invoices = await prisma.$queryRaw<InvoiceAttribute[]>(query);

				const orders = orderBy.split(',').map((order) => {
					const [column, direction] = order.split(':') as [keyof InvoiceAttribute, 'ASC' | 'DESC'];
					if (!validColumns.includes(column) || !['ASC', 'DESC'].includes(direction)) {
						throw new BadRequest('invalid_order_by', 'Invalid orderBy parameter', 'Invalid orderBy parameter');
					}
					return { [column]: direction.toLowerCase() };
				});

				const where: Prisma.invoicesWhereInput = {
					branchId: branchId,
					isPrescriptionSale: false,
					...(search ? {
						customerName: {
							contains: search,
							mode: 'insensitive'
						}
					} : {})
				};

				const invoices = await prisma.invoices.findMany({
					where,
					orderBy: orders,
					take: parsedLimit,
					skip: offset,
					include: {
						invoice_prescriptions: {
							include: {
								doctor: true
							}
						},
						items: true,
						otherCharges: true,
					}
				});
				// Fetch user info based on UserType
				const userInfoPromises = invoices.map(async (invoice) => {
					if (!invoice.userId) {
						return null;
					}
					if (invoice.userType === 'user') {
						return prisma.users.findUnique(
							{
								where: {
									id: invoice.userId
								},
								select: { id: true, username: true }
							}).then((user) =>
									user ? ({
										id: user.id,
										username: user.username,
										type: 'user',
									}) : null
						);

					} else if (invoice.userType === 'membership') {
						return prisma.memberships.findUnique(
							{
								where: { id: invoice.userId },
								select: { id: true, username: true }
							}).then((membership) =>
									membership ? ({
										id: membership.id,
										username: membership.username,
										type: 'membership',
									}) : null
							);
					}
					return null;
				});

				const userInfos = await Promise.all(userInfoPromises);

				const invoicesWithUserInfo = invoices.map((invoice, index) => ({
					...invoice,
					userInfo: userInfos[index],
				}));

				const response = new Success(invoicesWithUserInfo).toJson;
				return res.status(200).json(response).end();
			} catch (error: any) {
				console.error(`Error fetching invoices: ${error.message}`);
				throw error;
			}
		}
	);

	public static createInvoice = AsyncMiddleware.asyncHandler(
		async (req: Request<any, any, CreateInvoice>, res: Response) => {
			try {
				const reqBody = req.body;
				// const {
				// 	items,
				// 	otherCharges,
				// 	user,
				// 	...invoiceData
				// } = req.body;
				// const pricesList = otherCharges.map((charge) => `${charge.name}:${charge.value}`).join(', ');
				// const itemsExtract = items.map((item) => {
				// 	const { id, ...returnedItem } = item;
				// 	return returnedItem;
				// });
				// // console.log('items', items);
				// // console.log('invoiceData', invoiceData);
				// const invoiceCreate = {
				// 	...invoiceData,
				// 	userId: user?.id,
				// 	userType: user?.type,
				// 	priceList: pricesList,
				// 	items: {
				// 		create: itemsExtract
				// 	},
				// 	otherCharges: {
				// 		create: otherCharges
				// 	},
				// 	branchId: req.params.branchId
				// }
				// const invoice = await prisma.invoices.create({ data: invoiceCreate });
				// @ts-ignore
				const invoice = await SalesInvoiceTask.createInvoiceWithStockUpdate(reqBody);
				const response = new Success(invoice).toJson;
				return res.status(201).json(response).end();
			} catch (error: any) {
				console.error(`Error creating invoice: ${error.message}`);
				throw error;
			}
		}
	);

	public static updateInvoice = AsyncMiddleware.asyncHandler(
		async (req: Request<{ id: string }>, res: Response) => {
			try {
				const { id } = req.params;
				const updated = await prisma.invoices.update({
					where: { id },
					data: req.body
				});
				if (!updated) {
					throw new BadRequest('update_failed', 'Update failed', 'Invoice not found');
				}
				const updatedInvoice = await prisma.invoices.findUnique({
					where: { id }
				});
				const response = new Success(updatedInvoice).toJson;
				return res.status(200).json(response).end();
			} catch (error: any) {
				console.error(`Error updating invoice: ${error.message}`);
				throw error;
			}
		}
	);

	public static deleteInvoice = AsyncMiddleware.asyncHandler(
		async (req: Request<{ id: string }>, res: Response) => {
			try {
				const { id } = req.params;
				const deleted = await prisma.invoices.delete({
					where: { id }
				});
				if (!deleted) {
					throw new BadRequest('delete_failed', 'Delete failed', 'Invoice not found');
				}
				const response = new Success({ message: 'Invoice deleted successfully' }).toJson;
				return res.status(200).json(response).end();
			} catch (error: any) {
				console.error(`Error deleting invoice: ${error.message}`);
				throw error;
			}
		}
	);

	public static getInvoicesPrescription = AsyncMiddleware.asyncHandler(
		async (req: Request<BranchIdParam, any, any, PaginationQueryV2>, res: Response) => {
			try {
				const branchId = req.params.branchId;
				const queryParse = transformExpressParamsForPrisma("invoice_prescriptions", req.query, prisma);

				const total = await prisma.invoice_prescriptions.count({
					where: {
						invoices: {
							branchId,
						},
						...queryParse.where,
					},
				});
				const invoicePrescriptions = await prisma.invoice_prescriptions.findMany({
					...queryParse,
					where: {
						invoices: {
							branchId,
						},
						...queryParse.where,
					},
					include: {
						invoices: {
							include: {
								items: true,
							}
						},
						doctor: true,
					}
				});

				const userInfos = await Promise.all(invoicePrescriptions.map((invoicePrescription) => {
					if (!invoicePrescription.invoices.userId) {
						return null;
					}
					if (invoicePrescription.invoices.userType === 'user') {
						return prisma.users.findUnique(
							{
								where: {
									id: invoicePrescription.invoices.userId
								},
								select: { id: true, username: true }
							}).then((user) =>
									user ? ({
										id: user.id,
										username: user.username,
										type: 'user',
									}) : null
						);

					} else if (invoicePrescription.invoices.userType === 'membership') {
						return prisma.memberships.findUnique(
							{
								where: { id: invoicePrescription.invoices.userId },
								select: { id: true, username: true }
							}).then((membership) =>
									membership ? ({
										id: membership.id,
										username: membership.username,
										type: 'membership',
									}) : null
							);
					}
					return null;
				}));

				const invoicePrescriptionsWithUserInfo = invoicePrescriptions.map((invoicePrescription, index) => ({
					...invoicePrescription,
					userInfo: userInfos[index],
				}));

				const response = new Success({
					data: invoicePrescriptionsWithUserInfo,
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
}