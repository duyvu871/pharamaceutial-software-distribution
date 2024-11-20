import RedisClient, { RedisClientOptions } from './index.ts';


export class RedisStack extends RedisClient {
		constructor(options: RedisClientOptions) {
			super(options);
		}
		// Push a value to the stack
		async push(key: string, value: string): Promise<number> {
			return this.instance.lpush(key, value);
		}
		// Pop a value from the stack
		async pop(key: string): Promise<string|null> {
			return this.instance.rpop(key);
		}
		// Peek at the top value of the stack
		async peek(key: string): Promise<string|null> {
			return this.instance.lindex(key, 0);
		}
		// Get the size of the stack
		async size(key: string): Promise<number> {
			return this.instance.llen(key);
		}
		// Get a range of values from the stack
		async range(key: string, start: number, end: number): Promise<string[]> {
			return this.instance.lrange(key, start, end);
		}
		// Trim the stack to a specific range
		async trim(key: string, start: number, end: number): Promise<string> {
			return this.instance.ltrim(key, start, end);
		}
		// Remove a value from the stack
		async remove(key: string, count: number, value: string): Promise<number> {
			return this.instance.lrem(key, count, value);
		}
		// Clear the stack
		async clear(key: string): Promise<void> {
			await this.instance.del(key);
		}
		// Check if the stack is empty
		async isEmpty(key: string): Promise<boolean> {
			return (await this.size(key)) === 0;
		}
}

export class RedisQueue extends RedisClient {
	constructor(options: RedisClientOptions) {
		super(options);
	}

}