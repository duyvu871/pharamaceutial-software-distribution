import AsyncMiddleware from 'server/utils/asyncHandler';
import RedisServer from 'src/loaders/RedisServer';
import { Request, Response } from "express";
import { QueryProduct } from 'validations/Autocomplete';
import Success from 'responses/successful/Success';
import config from 'config/app-config';
import * as path from 'node:path';
import ProductSearch from 'services/ProductSearch';

interface Product {
	id: string;
	name: string;
	description: string;
	quantity: string;
	image: string;
	price: string;
}


export class AutoCompleteController {
	public static search = AsyncMiddleware.asyncHandler(
		async (req: Request<unknown, unknown, QueryProduct>, res: Response) => {

			try {
				const redisServer: RedisServer = req.app.get('redis');
				const redis = redisServer.instance;

				const { query } = req.query;
				console.log(query)
				const searchQuery = `(@name:${query}*)|(@name:*${query}*)|(@name:*${query}*)`;

				const result = await redis.call('FT.SEARCH', 'productIndex', searchQuery, 'LIMIT' , 0,5 ) as [number, ...(string | string[])[]];

				const products: Product[] = [];

				for (let i = 1; i < result.length; i += 2) {
					const productData = result[i + 1] as string[];
					const product: Product = {
						id: result[i] as string,
						name: productData[1],
						description: productData[3],
						quantity: productData[5],
						price: productData[7],
						image: path.join(config.assetsUrl, `product/${productData[1]}.png`),
					};
					products.push(product);
				}

				const response = new Success(products);

				return res.status(200).json(response).end();
			} catch (error:any ) {
				console.error(`Error during search:  ${error.errorMessage || error.message}`);
				throw error;
			}
		})

	public static searchWithCSV = AsyncMiddleware.asyncHandler(
		async (req: Request<any, any, any, {query: string, limit: string}>, res: Response) => {
			try {
				const query = req.query.query;
				const limit = parseInt(req.query.limit, 10);
				const searchResult = await ProductSearch.search(query, limit);
				const targetSearch = 'drug_name';
				const targetSearchResult = searchResult.find((item) => item.field === targetSearch);
				if (!targetSearchResult) {
					const response = new Success([]).toJson;
					return res.status(200).json(response).end();
				}
				const details = targetSearchResult.result.map((item) =>
					ProductSearch.getDetail(item.toString())
				);
				const response = new Success(details).toJson;
				return res.status(200).json(response).end();
			} catch (error: any) {
				console.error(`Error during search:  ${error.errorMessage || error.message}`);
				throw error;
			}
		}
	)
};