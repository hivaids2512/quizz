import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import Redis from 'ioredis';
import { InjectRedis } from '@liaoliaots/nestjs-redis';
import { QUIZ_SESSION_REDIS_KEY } from '../consts/index.const';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    @InjectRedis() private readonly redis: Redis,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();

    // If api is not public, validate token
    const quizSessionToken = request.headers['x-access-session'];

    // if (!quizSessionToken) {
    //   throw new UnauthorizedException();
    // }

    // const session = await this.redis.get(`${QUIZ_SESSION_REDIS_KEY}:${quizSessionToken}`);

    // If there is no session, invalidate request
    // if (!session) {
    //   throw new UnauthorizedException();
    // }

    // Mock request data
    // request.session = { userId: '50587d48-83c6-4276-abd7-98a646f83d79', userName: 'Quy Vu' };
    // request.session = { userId: 'f7296367-ed44-4f92-b654-808b3aa48b08', userName: 'Quy Vu 2' };
    request.session = { userId: 'ef49a321-c2ca-49f6-87d5-5424122f2a04', userName: 'Quy Vu 3' };

    return true;
  }
}
