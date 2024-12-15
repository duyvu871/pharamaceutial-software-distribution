import { Request, Response } from 'express';
import AsyncMiddleware from 'utils/asyncHandler';
import ProductSchema from 'server/repository/product/schema';
import Success from 'responses/successful/Success';
import BadRequest from 'responses/clientErrors/BadRequest';
import { ProductAttributes } from 'server/repository/product/schema';
import { Op } from 'sequelize';
import { BranchIdParam } from 'validations/Branch.ts';
// import StoreSchema from 'server/repository/store/schema';
import ProductUnitSchema from 'repository/product/product-unit/schema.ts';
import GroupSchema from 'repository/group/schema.ts';
import {models} from 'repository/association.ts';

export class ProductController {
	public static getProducts = AsyncMiddleware.asyncHandler(
		async (req: Request<BranchIdParam, any, any, { page: string, limit: string, orderBy: string, search: string }>, res: Response) => {
			try {
				const branchId = req.params.branchId;
				const { page = '1', limit = '10', orderBy = 'created_at:ASC', search } = req.query;
				const parsedPage = parseInt(page, 10);
				const parsedLimit = parseInt(limit, 10);
				const offset = (parsedPage - 1) * parsedLimit;
				const orders = orderBy.split(',').map((order) => order.split(':')) as [string, 'ASC' | 'DESC'][];

				const store = await models.StoreSchema.findOne({ where: { branch_id: branchId } });

				if (!store) {
					throw new BadRequest('invalid_branch', 'Invalid branchId', 'Branch not found');
				}

				const whereClause: any = {};
				if (search) {
					whereClause.product_name = { [Op.like]: `%${search}%` };
				}

				const products = await ProductSchema.findAll({
					where: {
						...whereClause,
						store_id: branchId
					},
					limit: parsedLimit,
					offset,
					order: orders,
					include: [
						{
							model: ProductUnitSchema,
							as: 'productUnit',
						},
						{
							model: GroupSchema,
							as: 'group_id',
							through: { attributes: [] }
						}
					]
				});

				const response = new Success(products).toJson;
				return res.status(200).json(response).end();
			} catch (error: any) {
				console.error(`Error fetching products: ${error.message}`);
				throw error;
			}
		}
	);

	public static createProduct = AsyncMiddleware.asyncHandler(
		async (req: Request, res: Response) => {
			try {
				const product = await ProductSchema.create(req.body);
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
				const [updated] = await ProductSchema.update(req.body, {
					where: { id }
				});
				if (!updated) {
					throw new BadRequest('update_failed', 'Update failed', 'Product not found');
				}
				const updatedProduct = await ProductSchema.findByPk(id);
				const response = new Success(updatedProduct).toJson;
				return res.status(200).json(response).end();
			} catch (error: any) {
				console.error(`Error updating product: ${error.message}`);
				throw error;
			}
		}
	);

	public static deleteProduct = AsyncMiddleware.asyncHandler(
		async (req: Request<{ id: string }>, res: Response) => {
			try {
				const { id } = req.params;
				const deleted = await ProductSchema.destroy({
					where: { id }
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