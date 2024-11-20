import { BaseDBClient } from '../base/sql';
import { Model } from 'sequelize';

class MySQLClient<ModelInstance extends Model> extends BaseDBClient<ModelInstance> {
	constructor(options: { database: string; username: string; password: string; host: string; port: number }) {
		super({
			...options,
			dialect: 'mysql', // MySQL dialect
		});
	}

	// Additional MySQL specific methods can go here
}

export default MySQLClient;
