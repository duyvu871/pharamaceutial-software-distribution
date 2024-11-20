import {
    Sequelize,
    Model,
    Options,
    Transaction,
    QueryTypes,
    QueryOptionsWithType, ModelStatic, WhereOptions, Attributes, ModelAttributes, ModelOptions
} from 'sequelize';
import {MakeNullishOptional} from "sequelize/lib/utils";
import { Logger } from 'winston';

export interface BaseDBClientOptions extends Options {
    database: string;
    username: string;
    password: string;
}

export type BaseDBClientOptionsOrSequelize = BaseDBClientOptions | Sequelize;

export abstract class BaseDBClient<ModelInstance extends Model> {
    protected sequelize: Sequelize;
    protected model!: ModelStatic<ModelInstance>;
    protected Logger!: Logger;

    constructor(options: BaseDBClientOptionsOrSequelize) {
        try {
            if (options instanceof Sequelize) {
                this.sequelize = options;
            } else {
                const { database, username, password, ...restOptions } = options;
                // Initialize the Sequelize instance
                this.sequelize = new Sequelize(database, username, password, {
                    logging: false, // Disable logging by default, set to true for debugging
                    ...restOptions,
                });
            }
        } catch (error) {
            console.error('Error initializing Sequelize:', error);
            throw new Error('Failed to initialize database connection');
        }
    }

    // Connect to the database
    async connect(): Promise<void> {
        try {
            await this.sequelize.authenticate();
            this.Logger.info('Database connected successfully.');
        } catch (error) {
            this.Logger.error('Unable to connect to the database:', error);
            throw new Error('Database connection failed');
        }
    }

    // Close the database connection
    async disconnect(): Promise<void> {
        try {
            await this.sequelize.close();
            this.Logger.info(`Database ${this.model.tableName} connection closed.`);
        } catch (error) {
            this.Logger.error(`Error closing database ${this.model.tableName}  connection:`, error);
        }
    }

    // Define a model dynamically
    public defineModel(name: string, attributes: ModelAttributes, options: ModelOptions): typeof Model {
        try {
            return this.sequelize.define(name, attributes, options);
        } catch (error) {
            this.Logger.error(`Error defining model "${name}":`, error);
            throw new Error(`Failed to define model "${name}"`);
        }
    }

    // Create a record
    public async createRecord<T extends ModelInstance>(data: MakeNullishOptional<T['_creationAttributes']>): Promise<T> {
        try {
            return await this.model.create(data) as T;
        } catch (error) {
            this.Logger.error('Error creating record:', error);
            throw new Error('Failed to create record');
        }
    }

    // Find a single record by conditionT
    public async findOne<T extends ModelInstance>( condition: WhereOptions<Attributes<T>>): Promise<T | null> {
        try {
            return await this.model.findOne({ where: condition }) as T | null;
        } catch (error) {
            this.Logger.error('Error finding record:', error);
            throw new Error('Failed to find record');
        }
    }

    // Find multiple records
    public async findAll<T extends ModelInstance>(condition: WhereOptions<Attributes<T>>): Promise<T[]> {
        try {
            return await this.model.findAll({ where: condition }) as T[];
        } catch (error) {
            this.Logger.error(`Error finding records for ${this.model.tableName}:`, error);
            throw new Error('Failed to find records');
        }
    }

    // Update a record
    public async updateRecord<T extends ModelInstance>(data: Partial<T['_creationAttributes']>, condition: WhereOptions<Attributes<T>>): Promise<T> {
        try {
            const [updated] = await this.model.update<ModelInstance>(
              data,
              {
                  where: condition,
                  returning: true, // Return the updated record
              }
            );
            return updated as unknown as T;
        } catch (error) {
            this.Logger.error(`Error updating record for ${this.model.tableName}}:`, error);
            throw new Error('Failed to update record');
        }
    }

    // Delete a record
    public async deleteRecord<T extends ModelInstance>(condition: WhereOptions<Attributes<T>>): Promise<void> {
        try {
            await this.model.destroy({ where: condition });
        } catch (error) {
            this.Logger.error(`Error deleting record for ${this.model.tableName}:`, error);
            throw new Error('Failed to delete record');
        }
    }

    // Execute a raw SQL query
    public async executeQuery<Res extends object ,T extends QueryTypes>(query: string, queryOption?: QueryOptionsWithType<T>): Promise<Res[]> {
        try {
            return await this.sequelize.query<Res>(query, {
                ...(queryOption || {}),
                type: QueryTypes.SELECT,
            });
        } catch (error) {
            this.Logger.error(`Error executing query "${query}" and option "${JSON.stringify(queryOption)}":`, error);
            throw new Error('Failed to execute query');
        }
    }

    // Transaction management
    public async withTransaction<T>(callback: (transaction: Transaction) => Promise<T>): Promise<T> {
        const transaction = await this.sequelize.transaction();
        try {
            const result = await callback(transaction);
            await transaction.commit();
            return result;
        } catch (error) {
            await transaction.rollback();
            this.Logger.error('Transaction failed:', error);
            throw new Error('Transaction rolled back due to error');
        }
    }
}
