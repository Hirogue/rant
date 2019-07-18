import * as Youch from 'youch';
import * as moment from 'moment';
import { Catch, ArgumentsHost, HttpException, ExceptionFilter, HttpStatus } from '@nestjs/common';
import { Logger } from '../../libs/logger';

@Catch()
export class ExceptionsFilter implements ExceptionFilter {
    async catch(exception: unknown, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse();
        const request = ctx.getRequest();

        Logger.error('exception', exception);

        const timestamp = moment().format('YYYY-MM-DD HH:mm:ss');

        if (exception instanceof HttpException) {
            const status = exception.getStatus();
            Logger.error(
                `Catch http exception at ${request.method} ${request.url} ${status}`
            );

            response
                .status(status)
                .send({
                    ...exception,
                    timestamp,
                    path: request.url
                });
        } else {
            if (process.env.NODE_ENV !== 'production' && !request.xhr) {
                Logger.error('INTERNAL_SERVER_ERROR');

                const youch = new Youch(exception, request);
                const html = await youch
                    .addLink(({ message }) => {
                        const url = `https://cn.bing.com/search?q=${encodeURIComponent(
                            `[adonis.js] ${message}`
                        )}`;
                        return `<a href="${url}" target="_blank" title="Search on bing">Search Bing</a>`;
                    })
                    .toHTML();

                response
                    .type('text/html')
                    .status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .send(html);
            } else {
                response
                    .status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .send({
                        ...exception,
                        timestamp,
                        path: request.url
                    });
            }
        }
    }
}
