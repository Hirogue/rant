import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response } from 'express';
import { StatisticsService } from './statistics.service';

@Injectable()
export class AccessStatisticsMiddleware implements NestMiddleware {

    constructor(private readonly statisticsService: StatisticsService) { }

    async use(req: Request, res: Response, next: Function) {

        next();

        const url = req.originalUrl;

        if (!url.startsWith('/api') && !url.startsWith('/_next') && !url.startsWith('/graphql')) {

            const headers = { ...req.headers };
            const path = headers['x-path'];
            const userAgent = headers['user-agent'];

            await this.statisticsService.recordAccess(
                req.ip,
                req.method,
                path ? path.toString() : url,
                userAgent,
                res.statusCode
            );
        }
    }
}
