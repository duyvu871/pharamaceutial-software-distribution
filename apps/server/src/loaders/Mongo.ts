import mongoose from 'mongoose';
import config from 'config/app-config';


export default class MongoDB {
	mongoConnection: mongoose.Mongoose | null = null;

	public connectMongoDB = async (): Promise<void> => {
		try {
			this.mongoConnection = await connectMongoDB();
			console.log('MongoDB connected successfully');
		} catch (error) {
			console.error('Error connecting to MongoDB:', error);
			// process.exit(1);
		}
	}

	public close = (): void => {
		if (this.mongoConnection) {
			this.mongoConnection.connection.close();
		}
	}
}

export const connectMongoDB = async (): Promise<mongoose.Mongoose> => {
	let mongooseConnection: mongoose.Mongoose;

	try {
		mongooseConnection = await mongoose.connect(config.mongoUri);
		console.log('MongoDB connected successfully');
	} catch (error) {
		console.error('Error connecting to MongoDB:', error);
		process.exit(1);
	}

	mongoose.connection.on('connected', () => {
		console.log('Mongoose connected to DB');
	});

	mongoose.connection.on('error', (err) => {
		console.error('Mongoose connection error:', err);
	});

	mongoose.connection.on('disconnected', () => {
		console.log('Mongoose disconnected');
	});

	process.on('SIGINT', async () => {
		await mongooseConnection.connection.close();
		console.log('Mongoose connection closed due to app termination');
		process.exit(0);
	});

	return mongooseConnection;
};
