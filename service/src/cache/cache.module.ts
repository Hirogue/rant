import { Module } from "@nestjs/common";
import { RedisModule } from "nestjs-redis";
import { Config } from "../config";
import { CacheService } from "./cache.service";

@Module({
    imports: [RedisModule.register(Config.redis)],
    providers: [CacheService],
    exports: [CacheService]
})
export class CacheModule { }