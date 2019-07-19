import { createParamDecorator } from '@nestjs/common';

export const Me = createParamDecorator(async (param, request) => {
    return !param ? request.user : request.user[param];
});