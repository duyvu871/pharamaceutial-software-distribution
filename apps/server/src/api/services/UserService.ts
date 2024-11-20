import * as SocketIO from 'socket.io';
import RedisServer from 'src/loaders/RedisServer';

class UserService {

	constructor(private socket: SocketIO.Server, private redisServer: RedisServer) {}

	// checkLoginUser = async (username: string, password: string): Promise<{username: boolean; password:boolean}> => {
	//
	// }
}