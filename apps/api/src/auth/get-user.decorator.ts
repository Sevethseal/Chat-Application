import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const GetUser = createParamDecorator(
  (data: keyof any, ctx: ExecutionContext) => {
    const req = ctx.switchToHttp().getRequest();
    const user = req.user || {};
    return data ? user[data] : user;
  },
);
