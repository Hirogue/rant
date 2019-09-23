import { Injectable } from '@nestjs/common';
import { Redis } from 'ioredis';
import { RedisService } from 'nestjs-redis';
import { Logger } from '../logger';

@Injectable()
export class CacheService {
  private readonly client: Redis;

  constructor(private readonly redis: RedisService) {
    this.client = this.redis.getClient();
  }

  get Client() {
    return this.client;
  }

  async get(key: string) {
    Logger.debug('get cache key:', key);

    return await this.client.get(key);
  }

  async set(key: string, value: string, expire?: number) {
    Logger.debug('set cache key:', key);
    Logger.debug('set cache value:', value);

    if (expire > 0) {
      Logger.debug('set cache expire:', expire);
      return await this.client.set(key, value, 'EX', expire);
    }

    return await this.client.set(key, value);
  }

  async del(key: string) {
    Logger.debug('del cache key:', key);

    return await this.client.del(key);
  }
}
