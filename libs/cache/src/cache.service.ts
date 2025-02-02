import { Inject, Injectable } from '@nestjs/common';
import * as Redis from 'ioredis';
import { REDIS_CLIENT } from './cache.constants';
import { RedisClient, RedisClientError } from './cache.providers';

@Injectable()
export class CacheService {
    constructor(@Inject(REDIS_CLIENT) private readonly redisClient: RedisClient) {}

    getClient(name?: string): Redis.Redis {
        if (!name) {
            name = this.redisClient.defaultKey;
        }
        if (!this.redisClient.clients.has(name)) {
            throw new RedisClientError(`client ${name} is not exists`);
        }
        return this.redisClient.clients.get(name);
    }

    getClients(): Map<string, Redis.Redis> {
        return this.redisClient.clients;
    }
}
