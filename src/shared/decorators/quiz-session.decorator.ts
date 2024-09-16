import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const QuizSession = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    const session = request.quizSession;
    return session;
  },
);
