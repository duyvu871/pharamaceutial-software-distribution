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
import {
	CreateProduct,
	DeleteProductParams,
	GetStoreProductQuery,
	ProductIdParam,
	ProductType, UpdateProduct,
} from 'validations/Product.ts';
import { v4 as uuidv4 } from 'uuid';
import fs from 'fs';
import path from 'node:path';
import * as process from 'node:process';
import { InvoiceAttribute } from 'repository/transaction/import-invoice/schema.ts';
import config from 'config/app-config';
import { PaginationQueryV2 } from 'validations/Pagination.ts';
import { transformExpressParamsForPrisma } from 'server/shared/pagination-parse';

export class ProductController {
	public static getProducts = AsyncMiddleware.asyncHandler(
		async (req: Request<BranchIdParam, any, any, { page: string, limit: string, orderBy: string, search: string } & GetStoreProductQuery>, res: Response) => {
			try {
				const branchId = req.params.branchId;
				const { page = '1', limit = '10', orderBy = 'created_at:ASC', search, type } = req.query;
				console.log(req.query);
				const parsedPage = parseInt(page, 10);
				const parsedLimit = parseInt(limit, 10);
				const offset = (parsedPage - 1) * parsedLimit;
				// const orders = orderBy.split(',').map((order) => order.split(':')) as [string, 'ASC' | 'DESC'][];
				const validColumns = ['created_at', 'updated_at', 'consumer_name',]; // Define allowed columns
				// const orders = orderBy.split(',').map((order) => {
				// 	const [column, direction] = order.split(':') as [keyof ProductAttributes, 'ASC' | 'DESC'];
				// 	if (!validColumns.includes(column) || !['ASC', 'DESC'].includes(direction)) {
				// 		throw new BadRequest('invalid_order_by', 'Invalid orderBy parameter', 'Invalid orderBy parameter');
				// 	}
				// 	return [column, direction];
				// }) as [keyof ProductAttributes, 'ASC' | 'DESC'][];
				// let params: (string | number)[] = [];

				// let conditions = [
				// 	// Prisma.sql`store_id = (SELECT store_id FROM branches WHERE branch_id = ${branchId}::uuid)`
				// 	Prisma.sql`store_id = (SELECT id FROM stores WHERE branch_id = ${branchId}::uuid)`
				// ];
				//
				// if (search) {
				// 	conditions.push(
				// 		// Prisma.sql`to_tsvector('vietnamese', product_name || ' ' || COALESCE(description, '') || ' ' || COALESCE(manufacturer, '')) @@ to_tsquery('vietnamese', ${search})`
				// 		Prisma.sql`(product_name ILIKE ${`%${search}%`} OR COALESCE(description, '') ILIKE ${`%${search}%`} OR COALESCE(manufacturer, '') ILIKE ${`%${search}%`})`
				// 		// Prisma.sql`(product_name ILIKE ${`%${search}%`})`
				// 	);
				// }
				//
				// if (type) {
				// 	conditions.push(
				// 		Prisma.sql`type = ${type}`
				// 	);
				// }
				//
				// const whereClause = Prisma.sql`WHERE ${Prisma.join(conditions, ' AND ')}`;
				// const orderParse = orders
				// 	.map((order) => `"${order[0]}" ${order[1].toUpperCase()}`)
				// 	.join(', ');
				// const orderBySql = Prisma.sql([orderParse]);

				// const query = Prisma.sql`
        //     SELECT *
        //     FROM products
        //         ${whereClause}
        //     ORDER BY ${orderBySql}
        //         LIMIT CAST(${limit} AS bigint)
        //     OFFSET CAST(${offset} AS bigint)
				// `;
				// console.log(query.sql);
				// const products = await prisma.$queryRaw<ProductAttributes[]>(query);

				const orders = orderBy.split(',').map((order) => {
					const [column, direction] = order.split(':') as [keyof ProductAttributes, 'ASC' | 'DESC'];
					if (!validColumns.includes(column) || !['ASC', 'DESC'].includes(direction)) {
						throw new BadRequest('invalid_order_by', 'Invalid orderBy parameter', 'Invalid orderBy parameter');
					}
					return { [column]: direction.toLowerCase() };
				});

				const whereConditions: Prisma.productsWhereInput[] = [
					{
						stores: {
							branch_id: branchId
						}
					}
				]

				if (search) {
					whereConditions.push({
						OR: [
							{ product_name: { contains: search, mode: 'insensitive'} },
							{ description: { contains: search, mode: 'insensitive'} },
							{ manufacturer: { contains: search, mode: 'insensitive'} }
						]
					});
				}

				const products = await prisma.products.findMany({
					where: {
						AND: whereConditions,
						...(type ? {
							store_group: {
								group_slug: type
							}
						} : {})
					},
					orderBy: orders,
					take: parsedLimit,
					skip: offset,
					include: {
						product_units: true
					}
				})

				// const productUnitIds = products
				// 	.map((consumer) => consumer.productUnit)
				// 	.filter((id) => Boolean(id)) as string[] ;
				// const productUnits = await prisma.product_units.findMany({
				// 	where: { id: { in: productUnitIds } }
				// });
				//
				const joinedProductUnits = products.map((product, index) => {
					const {product_units, ...productRest} = product;
					return {
						...productRest,
						productUnit: product_units
					}
				})

				const response = new Success(joinedProductUnits).toJson;
				return res.status(200).json(response).end();
			} catch (error: any) {
				console.error(`Error fetching products: ${error.message}`);
				throw error;
			}
		}
	);

	public static getProductV2 = AsyncMiddleware.asyncHandler(
		async (req: Request<BranchIdParam & ProductType, any, any, PaginationQueryV2>, res: Response) => {
			try {
				const branchId = req.params.branchId;
				const productType = req.params.productType;
				const protectAttributes = ["branch_id"];
				const queryParse = transformExpressParamsForPrisma("products", req.query, prisma);
				console.log(queryParse);
				const total = await prisma.products.count({
					where: {
						stores: {
							branch_id: branchId
						},
						...queryParse.where,
						...(productType ? { store_group: {group_slug: productType} } : {})
					},
				});
				const doctors = await prisma.products.findMany({
					...queryParse,
					where: {
						stores: {
							branch_id: branchId
						},
						...queryParse.where,
						...(productType ? { store_group: {group_slug: productType} } : {})
					},
					include: {
						product_units: true,
						product_assets: true,
						store_group: true,
						groups: true,
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
		async (req: Request<BranchIdParam & ProductIdParam, any, UpdateProduct>, res: Response) => {
			try {
				const { branchId, productId } = req.params;
				const updated = await prisma.products.update({
					where: {
						id: productId,
						stores: {
							branch_id: branchId
						}
					},
					data: {
						...req.body
					}
				});

				const response = new Success(updated).toJson;
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

	public static uploadImage = AsyncMiddleware.asyncHandler(
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

				const productAsset = await prisma.product_assets.create({
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
	);

	// public st
}