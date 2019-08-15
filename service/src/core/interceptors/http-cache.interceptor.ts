import { CacheInterceptor, ExecutionContext, Injectable } from "@nestjs/common";
import { Logger } from "../../logger";

@Injectable()
export class HttpCacheInterceptor extends CacheInterceptor {
    trackBy(context: ExecutionContext): string | undefined {

        const request = context.switchToHttp().getRequest();
        if (!request) return undefined;

        const cacheKey = `http-cache-${request.originalUrl}`;

        Logger.log(cacheKey);

        return cacheKey;
    }
}