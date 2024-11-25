import RedisServer from '../../loaders/RedisServer';
import { Request, Response } from "express";

interface Product {
  id: string;
  name: string;
  description: string;
  quantity: string;
  price: string;
}

export const SearchProduct = async (req: Request, res: Response) => {
  try {
    const redisServer: RedisServer = req.app.get('redis');
    const redis = redisServer.instance;

    const { query } = req.body;
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

    res.status(200).json({ products });
  } catch (error) {
    console.error('Error during search:', error);
    res.status(500).json({ error: 'An error occurred while searching' });
  }
};
