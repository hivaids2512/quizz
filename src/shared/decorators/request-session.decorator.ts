import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const RequestSession = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    const session = request.session;
    return session;
  },
);
