import * as path from 'node:path';
import * as process from 'node:process';

const workerPath = path.join(process.cwd(), 'dist/workers')
export {
	workerPath
}