import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { CrudRequestOptions } from '@nestjsx/crud';
import { PARSED_CRUD_REQUEST_KEY } from '../constants';
import { ParsedRequestParams } from '../crud-request';
import { RequestQueryParser } from '../crud-request/request-query.parser';
import { R } from '../helpers';

export interface CrudRequest {
  parsed: ParsedRequestParams;
  options: CrudRequestOptions;
}

@Injectable()
export class RequestInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler) {
    const req = context.switchToHttp().getRequest();

    /* istanbul ignore else */
    if (!req[PARSED_CRUD_REQUEST_KEY]) {
      const controller = context.getClass();
      const options = R.getCrudOptions(controller) || ({} as any);
      const parsed = RequestQueryParser.create()
        .parseParams(req.params, options.params)
        .parseQuery(req.query)
        .getParsed();

      const crudReq: CrudRequest = {
        parsed,
        options: {
          query: options.query,
          routes: options.routes,
          params: options.params,
        },
      };

      req[PARSED_CRUD_REQUEST_KEY] = crudReq;
    }

    return next.handle();
  }
}
