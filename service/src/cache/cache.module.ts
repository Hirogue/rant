import { Module, Global } from "@nestjs/common";
import { RedisModule } from "nestjs-redis";
import { Config } from "../config";
import { CacheService } from "./cache.service";

@Global()
@Module({
    imports: [
        RedisModule.register(Config.redis),
    ],
    providers: [CacheService],
    exports: [CacheService]
})
export class CacheModule { }