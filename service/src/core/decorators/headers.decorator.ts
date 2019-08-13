import { createParamDecorator } from '@nestjs/common';

export const Headers = createParamDecorator(
    (data, [root, args, ctx, info]) => data ? ctx.req.headers[data] : ctx.req.headers
);
