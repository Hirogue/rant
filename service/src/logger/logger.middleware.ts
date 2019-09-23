import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response } from 'express';
import { Logger } from './logger';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: Function) {
    const statusCode = res.statusCode;
    const logFormat = `${req.method} ${req.originalUrl} ${req.ip} ${statusCode}`;

    // Logger.debug('payload', req.body);

    next();

    if (statusCode >= 500) {
      Logger.error(logFormat);
    } else if (statusCode >= 400) {
      Logger.warn(logFormat);
    } else {
      !req.originalUrl.startsWith('/graphql') && Logger.log(logFormat);
    }
  }
}
