interface BaseNoSQLClientOptions {
	uri: string;
	databaseName?: string;
}

export abstract class BaseNoSQLClient {
	protected client: any;
	protected db: any;

	constructor(protected options: BaseNoSQLClientOptions) {}

	// Connect to the database (abstract method to be implemented by subclasses)
	abstract connect(): Promise<void>;

	// Disconnect from the database
	async disconnect(): Promise<void> {
		if (this.client) {
			await this.client.close();
			console.log('NoSQL Database connection closed.');
		}
	}

	// Abstract methods for common NoSQL operations (to be implemented by subclasses)
	abstract insertOne(collection: string, document: object): Promise<any>;
	abstract findOne(collection: string, query: object): Promise<any>;
	abstract findMany(collection: string, query: object): Promise<any[]>;
	abstract updateOne(collection: string, query: object, update: object): Promise<any>;
	abstract deleteOne(collection: string, query: object): Promise<any>;
}

