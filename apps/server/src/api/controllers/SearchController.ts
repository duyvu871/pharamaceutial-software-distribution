import AsyncMiddleware from 'server/utils/asyncHandler';
import RedisServer from '../../loaders/RedisServer';
import { Request, Response } from "express";
import { SearchBody } from '../validations/SearchProduct';

interface Product {
  id: string;
  name: string;
  description: string;
  quantity: string;
  price: string;
}


export class SearchProduct {
  public static search = AsyncMiddleware.asyncHandler(
    async (req: Request<unknown, unknown, SearchBody>, res: Response) => {

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
      };
      products.push(product);
    }

    return res.status(200).json({ products }).end();
  } catch (error:any ) {
    console.error(`Error during search:  ${error.errorMessage || error.message}`);
    throw error; 
  }
})
};
