import { createParamDecorator } from '@nestjs/common';

export const Me = createParamDecorator(
  (data, [root, args, ctx, info]) => ctx.req.user,
);
