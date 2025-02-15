import { Request, Response } from 'express';
import AsyncMiddleware from 'utils/asyncHandler';
// import { ConsumerSchema } from 'server/repository/consumer';
import Success from 'responses/successful/Success';
import BadRequest from 'responses/clientErrors/BadRequest';
import {
	ConsumerIdParam,
	ConsumerValidation,
	CreateConsumer,
	DeleteConsumer,
	GetConsumerParam,
	GetConsumersQuery,
} from 'validations/Consumer.ts';
import { Op } from 'sequelize';
import { ConsumerAttributes } from 'server/repository/consumer/schema.ts';
import prisma from 'repository/prisma.ts';
import {Prisma} from '@repo/orm';
import { BranchIdParam } from 'validations/Branch.ts';
import { InvoiceAttribute } from 'repository/transaction/import-invoice/schema.ts';

export class ConsumerController {
	public static getConsumers = AsyncMiddleware.asyncHandler(
		async (req: Request<GetConsumerParam, any, any, GetConsumersQuery>, res: Response) => {
			try {
				const { branchId } = req.params;
				console.log("jwt payload:", req.jwtPayload);
				const { page = '1', limit = '10', orderBy = 'createdAt:ASC', search } = req.query;
				const parsedPage = parseInt(page, 10);
				const parsedLimit = parseInt(limit, 10);
				const offset = (parsedPage - 1) * parsedLimit;
				// Validate orderBy parameter
				const validColumns = ['createdAt', 'updatedAt', 'consumer_name',]; // Define allowed columns
				// const orders = orderBy.split(',').map((order) => {
				// 	const [column, direction] = order.split(':') as [keyof ConsumerAttributes, 'ASC' | 'DESC'];
				// 	if (!validColumns.includes(column) || !['ASC', 'DESC'].includes(direction)) {
				// 		throw new BadRequest('invalid_order_by', 'Invalid orderBy parameter', 'Invalid orderBy parameter');
				// 	}
				// 	return [column, direction];
				// }) as [keyof ConsumerAttributes, 'ASC' | 'DESC'][];
				// let conditions = [Prisma.sql`branch_id = ${branchId}::uuid`];
				// let params: (string | number)[] = [];
				//
				// if (search) {
				// 	conditions.push(
				// 		// Prisma.sql`to_tsvector('english', consumer_name || ' ' || COALESCE(company_name, '') || ' ' || COALESCE(address, '') || ' ' || COALESCE(notes, '')) @@ to_tsquery('english', ${search})`
				// 		Prisma.sql`(consumer_name ILIKE ${`%${search}%`} OR phone_number ILIKE ${`%${search}%`}) OR consumer_email ILIKE ${`%${search}%`}`
				// 	);
				// }
				//
				// const whereClause = Prisma.sql`WHERE ${Prisma.join(conditions, ' AND ')}`;
				// // console.log("whereClause", whereClause.text);
				// const orderParse = orders.map((order, index) => `"${order[0]}" ${order[1].toUpperCase()}`).join(', ')
				// const orderBySql = Prisma.sql([orderParse]);
				//
				// const query = Prisma.sql`SELECT * FROM consumers ${whereClause} ORDER BY ${orderBySql} LIMIT CAST(${limit} AS bigint) OFFSET CAST(${offset} AS bigint)`;
				//
				// console.log("query", query.text);
				// const consumers = await prisma.$queryRaw<ConsumerAttributes[]>(query);

				const orders = orderBy.split(',').map((order) => {
					const [column, direction] = order.split(':') as [keyof ConsumerAttributes, 'ASC' | 'DESC'];
					if (!validColumns.includes(column) || !['ASC', 'DESC'].includes(direction)) {
						throw new BadRequest('invalid_order_by', 'Invalid orderBy parameter', 'Invalid orderBy parameter');
					}
					return { [column]: direction.toLowerCase() };
				});

				const whereConditions: Prisma.consumersWhereInput[] = [
					{
						branch_id: branchId
					}
				]

				if (search) {
					whereConditions.push({
						OR: [
							{ consumer_name: { contains: search, mode: 'insensitive'} },
							{ consumer_email: { contains: search, mode: 'insensitive'} },
							{ phone_number: { contains: search, mode: 'insensitive'} }
						]
					});
				}

				const consumers = await prisma.consumers.findMany({
					where: {
						AND: whereConditions,
					},
					orderBy: orders,
					take: parsedLimit,
					skip: offset,
					include: {
						points: {
							take: 1,
							select: {
								totalPoints: true
							}
						}
					}
				})

				const consumersFormatted = consumers.map(consumer => {
					const { points, ...rest } = consumer;
					return {
						...rest,
						point: points[0].totalPoints
					}
				})

				// console.log("consumers", consumers);
				const response = new Success(consumersFormatted).toJson;
				return res.status(200).json(response).end();
			} catch (error: any) {
				if (error instanceof Prisma.PrismaClientKnownRequestError) {
					console.error(`Error getting consumer: ${error.message} ${error.code}`);
					throw new BadRequest('get_failed', 'Get failed', "Error getting consumer");
				} else {
					console.error(`Error getting consumer: ${error.message}`);
					throw error;
				}
			}
		}
	);

	public static createConsumer = AsyncMiddleware.asyncHandler(
		async (req: Request<BranchIdParam, any, CreateConsumer>, res: Response) => {
			try {
				const parsed = req.body;
				const consumerObj = {
					...parsed,
					branch_id: req.params.branchId,
				} as unknown as ConsumerAttributes;

				const count = await prisma.consumers.count({
					where: {
						branch_id: req.params.branchId
					}
				});

				const consumer = await prisma.consumers.create({
					data: {
						...consumerObj,
						consumer_id: "KH" + (count + 1).toString().padStart(6, "0")
					}
				});

				const points = await prisma.points.create({
					data: {
						consumerId: consumer.id,
						totalPoints: 0
					}
				});

				const point_transaction = await prisma.point_transactions.create({
					data: {
						pointId: points.id,
						amount: 0,
						type: 'reward',
					}
				});
				const response = new Success(consumer).toJson;
				return res.status(201).json(response).end();
			} catch (error: any) {
				if (error instanceof Prisma.PrismaClientKnownRequestError) {
					console.error(`Error creating consumer: ${error.message} ${error.code}`);
					throw new BadRequest('create_failed', 'Create failed', "Error creating consumer");
				} else {
					console.error(`Error creating consumer: ${error.message}`);
					throw error;
				}
			}
		}
	);

	public static updateConsumer = AsyncMiddleware.asyncHandler(
		async (req: Request<{ id: string }>, res: Response) => {
			try {
				const { id } = req.params;
				const updated = await prisma.consumers.update({
					where: { id },
					data: req.body
				});
				if (!updated) {
					throw new BadRequest('update_failed', 'Update failed', 'Consumer not found');
				}
				const updatedConsumer = await prisma.consumers.findUnique({
					where: { id }
				});
				const response = new Success(updatedConsumer).toJson;
				return res.status(200).json(response).end();
			} catch (error: any) {
				if (error instanceof Prisma.PrismaClientKnownRequestError) {
					console.error(`Error updating consumer: ${error.message} ${error.code}`);
					throw new BadRequest('update_failed', 'Update failed', "Error updating consumer");
				} else {
					console.error(`Error updating consumer: ${error.message}`);
					throw error;
				}
			}
		}
	);

	public static deleteConsumer = AsyncMiddleware.asyncHandler(
		async (req: Request<BranchIdParam & DeleteConsumer>, res: Response) => {
			try {
				const { branchId, consumerId } = req.params;
				const deleted = await prisma.consumers.delete({
					where: {
						branch_id: branchId,
						id: consumerId
					}
				});
				if (!deleted) {
					throw new BadRequest('delete_failed', 'Delete failed', 'Consumer not found');
				}
				const response = new Success({ message: 'Consumer deleted successfully' }).toJson;
				return res.status(200).json(response).end();
			} catch (error: any) {
				if (error instanceof Prisma.PrismaClientKnownRequestError) {
					console.error(`Error deleting consumer: ${error.message} ${error.code}`);
					throw new BadRequest('delete_failed', 'Delete failed', "Error deleting consumer");
				} else {
					console.error(`Error deleting consumer: ${error.message}`);
					throw error;
				}
			}
		}
	);

	public static getConsumerRewardPoint = AsyncMiddleware.asyncHandler(
		async (req: Request<ConsumerIdParam & BranchIdParam>, res: Response) => {
			try {
				const { consumerId, branchId } = req.params;
				const rewardPoint = await prisma.points.findFirst({
					where: {
						consumerId: consumerId
					}
				});
				const response = new Success(rewardPoint).toJson;
				return res.status(200).json(response).end();
			} catch (error: any) {
				if (error instanceof Prisma.PrismaClientKnownRequestError) {
					console.error(`Error getting consumer reward point: ${error.message} ${error.code}`);
					throw new BadRequest('get_failed', 'Get failed', "Error getting consumer reward point");
				} else {
					console.error(`Error getting consumer reward point: ${error.message}`);
					throw error;
				}
			}
		}
	)
}