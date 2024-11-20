import { Sequelize } from 'sequelize';
import config from 'config/app-config';

const sequelize = new Sequelize({
	dialect: 'postgres',
	host: config.dbHost,
	port: config.dbPort,
	username: config.dbUser,
	password: config.dbPass,
	database: config.dbName,
});

sequelize.authenticate().then(() => {
	console.log('Connection has been established successfully.');
}).catch((error) => {
	console.error('Unable to connect to the database:', error);
	// process.exit(1);
})
//
// sequelize.sync({ force: true }).then(() => {
// 	console.log('All models were synchronized successfully.');
// }).catch((error) => {
// 	console.error('Unable to sync models:', error);
// 	// process.exit(1);
// });

export default sequelize;