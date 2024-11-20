import ExpressServer from './ExpressServer';
import RedisServer from './RedisServer';
import SocketServer from './SocketServer';
import CronJob from "./CronJob";
import MongoDB from 'server/loaders/Mongo';

export default async () => {
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

    process.on('exit', () => {
        expressServer.close();
        redisServer.close();
        socketServer.close();
        mongoDB.close();
    }).on('SIGINT', () => {
        expressServer.close();
        redisServer.close();
        socketServer.close();
        mongoDB.close();
    })
}