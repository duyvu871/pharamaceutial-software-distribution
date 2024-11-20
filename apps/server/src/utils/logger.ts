import { AppLogger } from '@repo/logger/node';
import * as path from 'node:path';
import config from 'config/app-config';

const appLoggerPath = path.posix.join(process.cwd(), config.isDev ? 'logs/dev' : 'logs/prod');

const logger = new AppLogger(appLoggerPath);
const appLogger = logger.createLogger('app');

export {
		appLogger
};

export default appLogger;
