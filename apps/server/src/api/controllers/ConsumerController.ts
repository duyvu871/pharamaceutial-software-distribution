import { Request, Response } from 'express';
import AsyncMiddleware from 'utils/asyncHandler';
// import { ConsumerSchema } from 'server/repository/consumer';
import Success from 'responses/successful/Success';
import BadRequest from 'responses/clientErrors/BadRequest';
import {
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
				const orders = orderBy.split(',').map((order) => {
					const [column, direction] = order.split(':') as [keyof ConsumerAttributes, 'ASC' | 'DESC'];
					if (!validColumns.includes(column) || !['ASC', 'DESC'].includes(direction)) {
						throw new BadRequest('invalid_order_by', 'Invalid orderBy parameter', 'Invalid orderBy parameter');
					}
					return [column, direction];
				}) as [keyof ConsumerAttributes, 'ASC' | 'DESC'][];
				let conditions = [Prisma.sql`branch_id = ${branchId}::uuid`];
				let params: (string | number)[] = [];

				if (search) {
					conditions.push(
						// Prisma.sql`to_tsvector('english', consumer_name || ' ' || COALESCE(company_name, '') || ' ' || COALESCE(address, '') || ' ' || COALESCE(notes, '')) @@ to_tsquery('english', ${search})`
						Prisma.sql`(consumer_name ILIKE ${`%${search}%`} OR phone_number ILIKE ${`%${search}%`}) OR consumer_email ILIKE ${`%${search}%`}`
					);
				}

				const whereClause = Prisma.sql`WHERE ${Prisma.join(conditions, ' AND ')}`;
				// console.log("whereClause", whereClause.text);
				const orderParse = orders.map((order, index) => `"${order[0]}" ${order[1].toUpperCase()}`).join(', ')
				const orderBySql = Prisma.sql([orderParse]);

				const query = Prisma.sql`SELECT * FROM consumers ${whereClause} ORDER BY ${orderBySql} LIMIT CAST(${limit} AS bigint) OFFSET CAST(${offset} AS bigint)`;

				console.log("query", query.text);
				const consumers = await prisma.$queryRaw<ConsumerAttributes[]>(query);
				// console.log("consumers", consumers);
				const response = new Success(consumers).toJson;
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
		async (req: Request<GetConsumerParam, any, CreateConsumer>, res: Response) => {
			try {
				const parsed = req.body;
				const consumerObj = {
					...parsed,
					branch_id: req.params.branchId,
				} as unknown as ConsumerAttributes;

				const consumer = await prisma.consumers.create({
					data: consumerObj
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
}