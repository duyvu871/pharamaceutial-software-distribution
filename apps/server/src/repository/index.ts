// import { Sequelize } from 'sequelize';
// import config from 'config/app-config';
// ;
// import StoreSchema from 'repository/store/schema.ts';
// import ProductSchema from 'repository/product/schema.ts';
// import ProductUnitSchema from 'repository/product/product-unit/schema.ts';
// import GroupSchema from 'repository/group/schema.ts';
// import { UserSchema } from 'repository/user';
// import { BranchSchema } from 'repository/branch';
// import { BranchDetailSchema } from 'repository/branch-detail';
// import { ConsumerSchema } from 'repository/consumer';
// import { MembershipSchema } from 'repository/membership';
//
// const sequelize = new Sequelize({
// 	dialect: 'postgres',
// 	host: config.dbHost,
// 	port: config.dbPort,
// 	username: config.dbUser,
// 	password: config.dbPass,
// 	database: config.dbName,
// });
//
// sequelize.authenticate().then( async () => {
// 	console.log('Connection has been established successfully.');
// }).catch((error) => {
// 	console.error('Unable to connect to the database:', error);
// 	// process.exit(1);
// })
//
//
// const models = {
// 	UserSchema: UserSchema,
// 	BranchSchema: BranchSchema,
// 	StoreSchema: StoreSchema,
// 	BranchDetailSchema: BranchDetailSchema,
// 	ConsumerSchema: ConsumerSchema,
// 	GroupSchema: GroupSchema,
// 	MembershipSchema: MembershipSchema,
// 	ProductSchema: ProductSchema,
// 	ProductUnitSchema: ProductUnitSchema,
// } as const;
//
//
// type Models = typeof models;
// type ModelInstances = {
// 	[K in keyof Models]: ReturnType<Models[K]>;
// };
//
// const db: ModelInstances & { sequelize: Sequelize, Sequelize: typeof Sequelize } = {
// 	sequelize: sequelize,
// 	Sequelize: Sequelize,
// 	...(Object.keys(models).reduce((acc, modelName) => {
// 		acc[modelName] = models[modelName](sequelize);
// 		return acc;
// 	}, {} as ModelInstances)),
// };
//
// Object.keys(models).forEach((modelName) => {
// 	if (models[modelName].associate) {
// 		models[modelName].associate(models);
// 	}
// });
//
// export default db;
//
