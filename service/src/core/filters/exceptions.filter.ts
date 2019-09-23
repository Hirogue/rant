import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { ApolloError } from 'apollo-server-core';
import { IncomingMessage, ServerResponse } from 'http';
import * as moment from 'moment';
import { parse as parseUrl } from 'url';
import * as Youch from 'youch';
import Config from '../../config';
import { Logger } from '../../logger';
import { ErrorResponse, RenderService } from '../../render';
import { ApolloException } from '../exceptions';

@Catch()
export class ExceptionsFilter implements ExceptionFilter {
  private readonly service: RenderService;

  constructor(service: RenderService) {
    this.service = service;
  }

  async catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const request = ctx.getRequest();
    const response = ctx.getResponse();

    if (response && request && request.url.startsWith(Config.ssr.prefix)) {
      const requestHandler = this.service.getRequestHandler();
      const errorRenderer = this.service.getErrorRenderer();

      // these really should already always be set since it is done during the module registration
      // if somehow they aren't throw an error
      if (!requestHandler || !errorRenderer) {
        throw new Error(
          'Request and/or error renderer not set on RenderService',
        );
      }

      const res: ServerResponse = response.res ? response.res : response;
      const req: IncomingMessage = request.raw ? request.raw : request;

      if (!res.headersSent && req.url) {
        // check to see if the URL requested is an internal nextjs route
        // if internal, the url is to some asset (ex /_next/*) that needs to be rendered by nextjs
        if (this.service.isInternalUrl(req.url)) {
          return requestHandler(req, res);
        }

        // let next handle the error
        // it's possible that the err doesn't contain a status code, if this is the case treat
        // it as an internal server error
        res.statusCode = exception && exception.status ? exception.status : 500;

        const { pathname, query } = parseUrl(req.url, true);

        const errorHandler = this.service.getErrorHandler();

        if (errorHandler) {
          await errorHandler(exception, request, response, pathname, query);
        }

        if (response.sent === true || res.headersSent) {
          return;
        }

        const serializedErr = this.serializeError(exception);

        return errorRenderer(serializedErr, req, res, pathname, query);
      }

      return;
    }

    Logger.error('exception:', exception.toString());

    const timestamp = moment().format('YYYY-MM-DD HH:mm:ss');

    if (exception instanceof HttpException) {
      const status = exception.getStatus();

      if (!!request && !!response) {
        return response.status(status).send({
          ...exception,
          timestamp,
          path: request.url,
        });
      }

      if (exception instanceof ApolloException) {
        throw new ApolloError(exception.getMessage(), status.toString());
      }

      throw new ApolloError(
        exception.message ? exception.message.message : 'Unknown Exception',
        status.toString(),
      );
    } else {
      Logger.error('INTERNAL_SERVER_ERROR');

      if (process.env.NODE_ENV !== 'production' && !!request && !request.xhr) {
        const youch = new Youch(exception, request);
        const html = await youch
          .addLink(({ message }) => {
            const url = `https://cn.bing.com/search?q=${encodeURIComponent(
              `[adonis.js] ${message}`,
            )}`;
            return `<a href="${url}" target="_blank" title="Search on bing">Search Bing</a>`;
          })
          .toHTML();

        response
          .type('text/html')
          .status(HttpStatus.INTERNAL_SERVER_ERROR)
          .send(html);
      } else {
        response.status(HttpStatus.INTERNAL_SERVER_ERROR).send({
          ...exception,
          timestamp,
          path: request.url,
        });
      }
    }
  }

  /**
   * Serialize the error similarly to method used in Next -- parse error as Nest error type
   * @param err
   */
  public serializeError(err: any): ErrorResponse {
    const out: ErrorResponse = {};

    if (!err) {
      return out;
    }

    if (err.stack && this.service.isDev()) {
      out.stack = err.stack;
    }

    if (err.response && typeof err.response === 'object') {
      const { statusCode, error, message } = err.response;
      out.statusCode = statusCode;
      out.name = error;
      out.message = message;
    } else if (err.message && typeof err.message === 'object') {
      const { statusCode, error, message } = err.message;
      out.statusCode = statusCode;
      out.name = error;
      out.message = message;
    }

    if (!out.statusCode && err.status) {
      out.statusCode = err.status;
    }

    if (!out.message && err.message) {
      out.message = err.message;
    }

    return out;
  }
}
