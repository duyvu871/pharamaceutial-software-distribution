import { Request, Response } from 'express';
import AsyncMiddleware from 'utils/asyncHandler';
// import ProductSchema from 'server/repository/product/schema';
import Success from 'responses/successful/Success';
import BadRequest from 'responses/clientErrors/BadRequest';
import { ProductAttributes } from 'server/repository/product/schema';
import { Op } from 'sequelize';
import { BranchIdParam } from 'validations/Branch.ts';
// import StoreSchema from 'server/repository/store/schema';
// import {models} from 'repository/association.ts';
import prisma from 'repository/prisma.ts';
import { ConsumerAttributes } from 'repository/consumer/schema.ts';
import { Prisma } from '@repo/orm';
import { CreateProduct, DeleteProductParams } from 'validations/Product.ts';

export class ProductController {
	public static getProducts = AsyncMiddleware.asyncHandler(
		async (req: Request<BranchIdParam, any, any, { page: string, limit: string, orderBy: string, search: string }>, res: Response) => {
			try {
				const branchId = req.params.branchId;
				const { page = '1', limit = '10', orderBy = 'created_at:ASC', search } = req.query;
				const parsedPage = parseInt(page, 10);
				const parsedLimit = parseInt(limit, 10);
				const offset = (parsedPage - 1) * parsedLimit;
				// const orders = orderBy.split(',').map((order) => order.split(':')) as [string, 'ASC' | 'DESC'][];
				const validColumns = ['created_at', 'updated_at', 'consumer_name',]; // Define allowed columns
				const orders = orderBy.split(',').map((order) => {
					const [column, direction] = order.split(':') as [keyof ProductAttributes, 'ASC' | 'DESC'];
					if (!validColumns.includes(column) || !['ASC', 'DESC'].includes(direction)) {
						throw new BadRequest('invalid_order_by', 'Invalid orderBy parameter', 'Invalid orderBy parameter');
					}
					return [column, direction];
				}) as [keyof ProductAttributes, 'ASC' | 'DESC'][];
				let params: (string | number)[] = [];

				let conditions = [
					// Prisma.sql`store_id = (SELECT store_id FROM branches WHERE branch_id = ${branchId}::uuid)`
					Prisma.sql`store_id = (SELECT id FROM stores WHERE branch_id = ${branchId}::uuid)`
				];

				if (search) {
					conditions.push(
						Prisma.sql`to_tsvector('english', consumer_name || ' ' || COALESCE(company_name, '') || ' ' || COALESCE(address, '') || ' ' || COALESCE(notes, '')) @@ to_tsquery('english', ${search})`
					);
				}

				const whereClause = Prisma.sql`WHERE ${Prisma.join(conditions, ' AND ')}`;
				const orderParse = orders
					.map((order) => `"${order[0]}" ${order[1].toUpperCase()}`)
					.join(', ');
				const orderBySql = Prisma.sql([orderParse]);

				const query = Prisma.sql`
            SELECT *
            FROM products 
                ${whereClause}
            ORDER BY ${orderBySql}
                LIMIT CAST(${limit} AS bigint)
            OFFSET CAST(${offset} AS bigint)
				`;
				console.log(query.sql);
				const products = await prisma.$queryRaw<ProductAttributes[]>(query);
				const productUnitIds = products
					.map((consumer) => consumer.productUnit)
					.filter((id) => Boolean(id)) as string[] ;
				const productUnits = await prisma.product_units.findMany({
					where: { id: { in: productUnitIds } }
				});

				const joinedProductUnits = products.map((product, index) => {
					return { ...product, productUnit: productUnits[index] || null };
				})

				const response = new Success(joinedProductUnits).toJson;
				return res.status(200).json(response).end();
			} catch (error: any) {
				console.error(`Error fetching products: ${error.message}`);
				throw error;
			}
		}
	);

	public static createProduct = AsyncMiddleware.asyncHandler(
		async (req: Request<any, any, any>, res: Response) => {
			try {
				const product = await prisma.products.create(req.body);
				const response = new Success(product).toJson;
				return res.status(201).json(response).end();
			} catch (error: any) {
				console.error(`Error creating product: ${error.message}`);
				throw error;
			}
		}
	);

	public static updateProduct = AsyncMiddleware.asyncHandler(
		async (req: Request<{ id: string }>, res: Response) => {
			try {
				const { id } = req.params;
				const updated = await prisma.products.update({
					where: { id },
					data: req.body
				});
				if (!updated) {
					throw new BadRequest('update_failed', 'Update failed', 'Product not found');
				}
				const updatedProduct = await prisma.products.findUnique(
					{ where: { id } }
				);
				const response = new Success(updatedProduct).toJson;
				return res.status(200).json(response).end();
			} catch (error: any) {
				console.error(`Error updating product: ${error.message}`);
				throw error;
			}
		}
	);

	public static deleteProduct = AsyncMiddleware.asyncHandler(
		async (req: Request<DeleteProductParams>, res: Response) => {
			try {
				const { branchId, productId } = req.params;
				let id;
				const storeId = await prisma.stores.findFirst({
					where: { branch_id: branchId },
				});

				if (!storeId) {
					throw new BadRequest('store_not_found', 'Store not found', 'Store not found');
				}

				id = storeId.id;

				const deleted = await prisma.products.delete({
					where: {
						id: productId,
						store_id: id
					},
				});
				if (!deleted) {
					throw new BadRequest('delete_failed', 'Delete failed', 'Product not found');
				}
				const response = new Success({ message: 'Product deleted successfully' }).toJson;
				return res.status(200).json(response).end();
			} catch (error: any) {
				console.error(`Error deleting product: ${error.message}`);
				throw error;
			}
		}
	);
}