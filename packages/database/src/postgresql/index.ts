import { BaseDBClient, BaseDBClientOptionsOrSequelize } from '../base/sql';
import { Model, Sequelize } from 'sequelize';

class PostgresClient<ModelInstance extends Model> extends BaseDBClient<ModelInstance> {
	constructor(options: BaseDBClientOptionsOrSequelize) {
		if (options instanceof Sequelize) {
			super(options);
		} else {
			super({
				...options,
				dialect: 'postgres', // PostgreSQL dialect
			});
		}
	}

	protected get DBClient() {
		return this;
	}
	// Additional PostgreSQL specific methods can go here
}

export default PostgresClient;