import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response } from 'express';
import { LoggerService } from './logger.service';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
    constructor(private readonly logger: LoggerService) {}

    use(req: Request, res: Response, next: Function) {
        next();

        const statusCode = res.statusCode;
        const logFormat = `${req.method} ${req.originalUrl} ${req.ip} ${statusCode}`;

        if (statusCode >= 500) {
            this.logger.error(logFormat);
        } else if (statusCode >= 400) {
            this.logger.warn(logFormat);
        } else {
            this.logger.log(logFormat);
        }
    }
}
