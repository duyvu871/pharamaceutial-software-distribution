import Redis, {Cluster, ClusterNode, Redis as RedisInstance, RedisOptions} from 'ioredis';
import {ScanStreamOptions} from "ioredis/built/types";

export type IRedisClient = RedisInstance | Cluster;
export type MessageHandler = (channel: string, message: string) => void;

export interface RedisClientOptions {
    isCluster?: boolean;
    nodes?: ClusterNode[];
    poolSize?: number;
    redisOptions: RedisOptions;
}

class RedisClient {
    private clients: IRedisClient[] = [];
    private client: IRedisClient;
    private subscriber?: IRedisClient;
    private publisher?: IRedisClient;
    private currentPoolIndex: number = 0;

    constructor(options: RedisClientOptions) {
        const { isCluster, nodes, poolSize, redisOptions } = options;

        Object.assign(redisOptions, {
            retryStrategy: (times: number) => {
                return Math.min(times * 50, 2000);
            },
            maxRetriesPerRequest: 5,
            ...redisOptions,
        });
        try {
            if (isCluster && nodes) {
                // Setup Redis Cluster
                this.client = new Redis.Cluster(nodes, redisOptions);
                this.subscriber = new Redis.Cluster(nodes, redisOptions);
                this.publisher = new Redis.Cluster(nodes, redisOptions);
            } else if (poolSize && poolSize > 1) {
                // Setup Redis Pool
                this.clients = Array.from({ length: poolSize }, () => new Redis(redisOptions));
                this.client = this.clients[Math.floor(Math.random() * this.clients.length)];
                this.subscriber = this.clients[Math.floor(Math.random() * this.clients.length)];
                this.publisher = this.clients[Math.floor(Math.random() * this.clients.length)];
            } else {
                // Setup Single Redis Instance
                this.client = new Redis(redisOptions);
                this.subscriber = new Redis(redisOptions);
                this.publisher = new Redis(redisOptions);
            }
        } catch (error) {
            console.error('Error initializing Redis client:', error);
            throw new Error('Failed to initialize Redis client');
        }
    }

    get instance(): IRedisClient {
        return this.client;
    }

    getClient(): IRedisClient {
        if (this.clients.length > 0) {
            this.currentPoolIndex = (this.currentPoolIndex + 1) % this.clients.length;
            return this.clients[this.currentPoolIndex];
        }
        return this.client;
    }

    // Connect to Redis
    async connect(): Promise<void> {
        try {
            await Promise.all([
                this.client.connect(),
                this.subscriber?.connect(),
                this.publisher?.connect(),
            ]);
        } catch (error) {
            console.error('Error connecting Redis clients:', error);
            throw new Error('Failed to connect to Redis');
        }
    }

    // Close connection(s)
    async disconnect() {
        try {
            await Promise.all([
                this.client.quit(),
                this.subscriber?.quit(),
                this.publisher?.quit(),
            ]);
        } catch (error) {
            console.error('Error disconnecting Redis clients:', error);
        }
    }

    // Read a single key
    async read(key: string): Promise<string | null> {
        try {
            return await this.getClient().get(key);
        } catch (error) {
            console.error(`Error reading key "${key}":`, error);
            throw new Error(`Failed to read key "${key}"`);
        }
    }

    // Read multiple keys at once
    async readMany(keys: string[]): Promise<(string | null)[]> {
        try {
            return await this.getClient().mget(...keys);
        } catch (error) {
            console.error(`Error reading multiple keys:`, error);
            throw new Error('Failed to read multiple keys');
        }
    }

    // Read multiple keys matching a pattern
    async readManyAsPattern(key: string, pattern: string, option?: ScanStreamOptions): Promise<(string | null)[]> {
        let finalKeysRead: string[] = [];
        let keys: string[] = [];
        try {
            const stream = this.getClient().sscanStream(key, {
                match: pattern,
                ...(option || {})
            });

            return new Promise((resolve, reject) => {
                stream.on('data', async (keys) => {
                    for (const key of keys) {
                        if (!keys.includes(key)) {
                            await finalKeysRead.push(key);
                        }
                    }
                });

                stream.on('end', () => {
                    resolve(keys);
                });
            }).then((keysets: unknown) => {
                (<string[][]>keysets).forEach((keyset) => {
                    keyset.forEach((key) => {
                        if (!finalKeysRead.includes(key)) {
                            finalKeysRead.push(key);
                        }
                    });
                });
                return finalKeysRead;
            })
        } catch (error: any) {
            console.error(`Error reading multiple keys:`, error);
            throw new Error('Failed to read multiple keys');
        }
    }

    // Write a JSON object
    async writeJson(key: string, value: object, expiryInSeconds?: number): Promise<void> {
        try {
            const jsonString = JSON.stringify(value);
            const client = this.getClient();
            if (expiryInSeconds) {
                await client.set(key, jsonString, 'EX', expiryInSeconds);
            } else {
                await client.set(key, jsonString);
            }
        } catch (error) {
            console.error(`Error writing JSON to key "${key}":`, error);
            throw new Error(`Failed to write JSON to key "${key}"`);
        }
    }

    // Read a JSON object
    async readAsJson<T>(key: string): Promise<T | null> {
        try {
            const jsonString = await this.getClient().get(key);
            return jsonString ? JSON.parse(jsonString) : null;
        } catch (error) {
            console.error(`Error reading JSON from key "${key}":`, error);
            throw new Error(`Failed to read JSON from key "${key}"`);
        }
    }

    // Write a hash
    async writeHash(key: string, hash: Record<string, any>): Promise<number> {
        try {
            return await this.getClient().hset(key, hash);
        } catch (error) {
            console.error(`Error writing hash to key "${key}":`, error);
            throw new Error(`Failed to write hash to key "${key}"`);
        }
    }

    // Write multiple values (from Set, Map, or Iterable)
    async writeMany(pairs: Iterable<[string, string]>): Promise<void> {
        try {
            const pipeline = this.getClient().pipeline();
            for (const [key, value] of pairs) {
                pipeline.set(key, value);
            }
            await pipeline.exec();
        } catch (error) {
            console.error('Error writing multiple key-value pairs:', error);
            throw new Error('Failed to write multiple key-value pairs');
        }
    }

    // Execute a custom Lua script
    async execute(script: string, keys: string[] = [], args: string[] = []): Promise<any> {
        try {
            return await this.getClient().eval(script, keys.length, ...keys, ...args);
        } catch (error) {
            console.error('Error executing Lua script:', error);
            throw new Error('Failed to execute Lua script');
        }
    }

    // Subscribe to one or more channels
    async subscribe(channels: string | string[], handler: MessageHandler): Promise<void> {
        if (!this.subscriber) throw new Error('Subscriber not initialized');
        const channelList = Array.isArray(channels) ? channels : [channels];

        try {
            this.subscriber.on('message', handler);
            await this.subscriber.subscribe(...channelList);
        } catch (error) {
            console.error(`Error subscribing to channels "${channelList}":`, error);
            throw new Error('Failed to subscribe to channels');
        }
    }

    // Unsubscribe from one or more channels
    async unsubscribe(channels: string | string[]): Promise<void> {
        if (!this.subscriber) throw new Error('Subscriber not initialized');
        const channelList = Array.isArray(channels) ? channels : [channels];

        try {
            await this.subscriber.unsubscribe(...channelList);
        } catch (error) {
            console.error(`Error unsubscribing from channels "${channelList}":`, error);
            throw new Error('Failed to unsubscribe from channels');
        }
    }

    // Publish a message to a channel
    async publish(channel: string, message: string): Promise<number> {
        if (!this.publisher) throw new Error('Publisher not initialized');

        try {
            return await this.publisher.publish(channel, message);
        } catch (error) {
            console.error(`Error publishing message to channel "${channel}":`, error);
            throw new Error('Failed to publish message');
        }
    }

    // Pattern-based Pub/Sub
    async psubscribe(pattern: string, handler: MessageHandler): Promise<void> {
        if (!this.subscriber) throw new Error('Subscriber not initialized');

        try {
            this.subscriber.on('pmessage', (pattern, channel, message) => {
                handler(channel, message);
            });
            await this.subscriber.psubscribe(pattern);
        } catch (error) {
            console.error(`Error subscribing to pattern "${pattern}":`, error);
            throw new Error('Failed to subscribe to pattern');
        }
    }

    async punsubscribe(pattern: string): Promise<void> {
        if (!this.subscriber) throw new Error('Subscriber not initialized');

        try {
            await this.subscriber.punsubscribe(pattern);
        } catch (error) {
            console.error(`Error unsubscribing from pattern "${pattern}":`, error);
            throw new Error('Failed to unsubscribe from pattern');
        }
    }
}

export default RedisClient;
