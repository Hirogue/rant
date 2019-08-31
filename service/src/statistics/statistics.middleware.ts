import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response } from 'express';
import { StatisticsService } from './statistics.service';

@Injectable()
export class StatisticsMiddleware implements NestMiddleware {

    constructor(private readonly statisticsService: StatisticsService) { }

    async use(req: Request, res: Response, next: Function) {

        if ('backstage' !== req.headers.application) {
            const position = req.originalUrl.search(/\?/);
            const urlInfo = req.originalUrl.substring(5, position ? position : req.originalUrl.length)
                .split('/');

            await this.statisticsService.logger(urlInfo[0], urlInfo[1], req.ip);
        }

        next();
    }
}
