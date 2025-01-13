import { Request, Response } from 'express';
import AsyncMiddleware from 'utils/asyncHandler';
import Success from 'responses/successful/Success';
import BadRequest from 'responses/clientErrors/BadRequest';
import prisma from 'repository/prisma.ts';
import { Prisma } from '@repo/orm';
import { BranchIdParam } from 'validations/Branch.ts';
import { ProviderAttributes, ProviderSchema } from 'repository/provider/schema.ts';
import { UserTask } from 'repository/user';
import { StoreTask } from 'repository/store/task.ts';

export class ProviderController {
	public static getProviders = AsyncMiddleware.asyncHandler(
		async (req: Request<BranchIdParam, any, any, { page: string, limit: string, orderBy: string, search: string }>, res: Response) => {
			try {
				const branchId = req.params.branchId;

				const { page = '1', limit = '10', orderBy = 'created_at:ASC', search } = req.query;
				const parsedPage = parseInt(page, 10);
				const parsedLimit = parseInt(limit, 10);
				const offset = (parsedPage - 1) * parsedLimit;
				const validColumns = ['createdAt', 'updated_at', 'companyName', 'phoneNumber']; // Define allowed columns
				const orders = orderBy.split(',').map((order) => {
					const [column, direction] = order.split(':') as [keyof Prisma.providersSelect, 'ASC' | 'DESC'];
					if (!validColumns.includes(column) || !['ASC', 'DESC'].includes(direction)) {
						throw new BadRequest('invalid_order_by', 'Invalid orderBy parameter', 'Invalid orderBy parameter');
					}
					return [column, direction];
				}) as [keyof Prisma.providersSelect, 'ASC' | 'DESC'][];

				let conditions = [
					Prisma.sql`"storeId" = (SELECT id FROM stores WHERE branch_id = ${branchId}::uuid)`
				];
				if (search) {
					conditions.push(
						Prisma.sql`to_tsvector('english', companyName || ' ' || COALESCE(phoneNumber, '') || ' ' || COALESCE(email, '') || ' ' || COALESCE(address, '')) @@ to_tsquery('english', ${search})`
					);
				}

				const whereClause = conditions.length ? Prisma.sql`WHERE ${Prisma.join(conditions, ' AND ')}` : Prisma.empty;
				const orderParse = orders
					.map((order) => `"${order[0]}" ${order[1].toUpperCase()}`)
					.join(', ');
				const orderBySql = Prisma.sql([orderParse]);

				const query = Prisma.sql`
            SELECT *
            FROM providers
                ${whereClause}
            ORDER BY ${orderBySql}
                LIMIT CAST(${limit} AS bigint)
            OFFSET CAST(${offset} AS bigint)
   	 `;
				console.log(query.sql);
				const providers = await prisma.$queryRaw<ProviderAttributes[]>(query);
				const response = new Success(providers).toJson;
				return res.status(200).json(response).end();
			} catch (error: any) {
				console.error(`Error fetching providers: ${error.message}`);
				throw error;
			}
		}
	);

	public static createProvider = AsyncMiddleware.asyncHandler(
		async (req: Request, res: Response) => {
			try {
				const {id, ...upsertData} = req.body;
				// removedUndefined.branch_id = req.params.branchId;
				// removedUndefined.employee_status = 'active';
				const branchId = req.params.branchId;
				const storeFromBranch = await StoreTask.getStoreFromBranch(branchId);
				const storeId = storeFromBranch?.id;
				if (!storeId) {
					throw new BadRequest('store_not_found', 'Store not found', 'Store not found');
				}

				let providerUpsert;

				if (!id) {
					providerUpsert = await prisma.providers.create({
						data: {
							...upsertData,
							storeId
						}
					});
				} else {
					providerUpsert = await prisma.providers.update({
						where: { id },
						data: {
							...upsertData,
						}
					});
				}

				const response = new Success(providerUpsert).toJson;
				return res.status(201).json(response).end();
			} catch (error: any) {
				console.error(`Error creating provider: ${error.message}`);
				throw error;
			}
		}
	);

	public static updateProvider = AsyncMiddleware.asyncHandler(
		async (req: Request<{ id: string }>, res: Response) => {
			try {
				const { id } = req.params;

				const updated = await prisma.providers.update({
					where: { id: id },
					data: req.body
				});
				if (!updated) {
					throw new BadRequest('update_failed', 'Update failed', 'Provider not found');
				}
				const response = new Success(updated).toJson;
				return res.status(200).json(response).end();
			} catch (error: any) {
				console.error(`Error updating provider: ${error.message}`);
				throw error;
			}
		}
	);

	public static deleteProvider = AsyncMiddleware.asyncHandler(
		async (req: Request<{ id: string }>, res: Response) => {
			try {
				const { id } = req.params;
				const deleted = await prisma.providers.delete({
					where: { id }
				});
				if (!deleted) {
					throw new BadRequest('delete_failed', 'Delete failed', 'Provider not found');
				}
				const response = new Success({ message: 'Provider deleted successfully' }).toJson;
				return res.status(200).json(response).end();
			} catch (error: any) {
				console.error(`Error deleting provider: ${error.message}`);
				throw error;
			}
		}
	);
}