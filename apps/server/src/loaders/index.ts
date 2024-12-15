import ExpressServer from './ExpressServer';
import RedisServer from './RedisServer';
import SocketServer from './SocketServer';
import CronJob from "./CronJob";
import MongoDB from 'server/loaders/Mongo';
import ProductSearch from 'services/ProductSearch';
import { RegionSearch } from 'services/RegionSearch.ts';

const MEMORY_LIMIT_MB = 200;
const INTERVAL_MS = 5000;
const MAX_RUNS = 10;

let runCount = 0;


export default async () => {
    // const interval = setInterval(() => {
    //     runCount++;
    //     const memoryUsage = process.memoryUsage();
    //     const resourceUsage = process.resourceUsage();
    //     console.log(`Heap Used: ${(memoryUsage.heapUsed / 1024 / 1024).toFixed(2)} MB`);
    //     console.log(`External Memory: ${(memoryUsage.external / 1024 / 1024).toFixed(2)} MB`);
    //     console.log(`RSS: ${(memoryUsage.rss / 1024 / 1024).toFixed(2)} MB`);
    //     console.log(`Max RSS: ${(resourceUsage.maxRSS / 1024).toFixed(2)} KB`);
    //
    //     if (runCount > 20) {
    //         clearInterval(interval);
    //     }
    // }, 500);
    // start express
    const expressServer = new ExpressServer();
    const expressInstance = expressServer.server;

    // start redis
    const redisServer = new RedisServer();
    const redisInstance = await redisServer.initialize();
    expressServer.initRedis(redisServer);

    // start socket 
    const socketServer = new SocketServer(expressInstance, redisServer);
    const socketInstance = socketServer.instance;
    expressServer.initSocket(socketInstance);

    const mongoDB = new MongoDB();
    await mongoDB.connectMongoDB();
    // const cronjob = new CronJob(socketServer, redisServer);
    // cronjob.initialize();

    await ProductSearch.createIndex();
    await RegionSearch.createIndexing();

    process.on('exit', () => {
        // clearInterval(interval);
        expressServer.close();
        redisServer.close();
        socketServer.close();
        mongoDB.close();
    }).on('SIGINT', () => {
        // clearInterval(interval);
        expressServer.close();
        redisServer.close();
        socketServer.close();
        mongoDB.close();
    });
}