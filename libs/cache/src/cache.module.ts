import { DynamicModule, Global, Module } from '@nestjs/common';
import { RedisModuleAsyncOptions, RedisModuleOptions } from './cache.interfaces';
import { createAsyncClientOptions, createClient } from './cache.providers';

import { REDIS_MODULE_OPTIONS } from './cache.constants';
import { CacheService } from './cache.service';

@Global()
@Module({
    providers: [CacheService],
    exports: [CacheService]
})
export class CacheModule {
    static register(options: RedisModuleOptions | RedisModuleOptions[]): DynamicModule {
        return {
            module: CacheModule,
            providers: [createClient(), { provide: REDIS_MODULE_OPTIONS, useValue: options }],
            exports: [CacheService]
        };
    }

    static registerAsync(options: RedisModuleAsyncOptions): DynamicModule {
        return {
            module: CacheModule,
            imports: options.imports,
            providers: [createClient(), createAsyncClientOptions(options)],
            exports: [CacheService]
        };
    }
}
