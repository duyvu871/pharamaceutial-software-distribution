import { Request, Response } from 'express';
import AsyncMiddleware from 'utils/asyncHandler';
import { ConsumerSchema } from 'server/repository/consumer';
import Success from 'responses/successful/Success';
import BadRequest from 'responses/clientErrors/BadRequest';
import { ConsumerValidation, CreateConsumer, GetConsumerParam, GetConsumersQuery } from 'validations/Consumer.ts';
import { Op } from 'sequelize';
import { ConsumerAttributes } from 'server/repository/consumer/schema.ts';

export class ConsumerController {
	public static getConsumers = AsyncMiddleware.asyncHandler(
		async (req: Request<GetConsumerParam, any, any, GetConsumersQuery>, res: Response) => {
			try {
				const { branchId } = req.params;
				console.log(req.jwtPayload);
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
				//
				const whereClause: any = { branch_id: branchId };
				if (search) {
					whereClause.consumer_name = { [Op.iLike]: `%${search}%` };
				}
				const consumers = await ConsumerSchema.findAll({
					where: whereClause,
					limit: parsedLimit,
					offset,
					order: orders
				});
				const parsedConsumers = consumers.map((consumer) => consumer.dataValues);
				const response = new Success(parsedConsumers).toJson;
				return res.status(200).json(response).end();
			} catch (error: any) {
				console.error(`Error fetching consumers: ${error.message}`);
				throw error;
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

				const consumer = await ConsumerSchema.create(consumerObj);
				const response = new Success(consumer).toJson;
				return res.status(201).json(response).end();
			} catch (error: any) {
				console.error(`Error creating consumer: ${error.message}`);
				throw error;
			}
		}
	);

	public static updateConsumer = AsyncMiddleware.asyncHandler(
		async (req: Request<{ id: string }>, res: Response) => {
			try {
				const { id } = req.params;
				const [updated] = await ConsumerSchema.update(req.body, {
					where: { id }
				});
				if (!updated) {
					throw new BadRequest('update_failed', 'Update failed', 'Consumer not found');
				}
				const updatedConsumer = await ConsumerSchema.findByPk(id);
				const response = new Success(updatedConsumer).toJson;
				return res.status(200).json(response).end();
			} catch (error: any) {
				console.error(`Error updating consumer: ${error.message}`);
				throw error;
			}
		}
	);
}