import { CacheInterceptor, ExecutionContext, Injectable } from '@nestjs/common';

@Injectable()
export class HttpCacheInterceptor extends CacheInterceptor {
  trackBy(context: ExecutionContext): string | undefined {
    const request = context.switchToHttp().getRequest();
    if (!request) return undefined;

    if (request.originalUrl.startsWith('/api/verification')) return undefined;

    const cacheKey = `http-cache-${request.originalUrl}`;

    return cacheKey;
  }
}
