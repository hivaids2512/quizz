import { InjectRedis } from '@liaoliaots/nestjs-redis';
import { Injectable } from '@nestjs/common';
import Redis from 'ioredis';

@Injectable()
export class LeaderboardService {
  constructor(@InjectRedis() private readonly redis: Redis) {}

  async getLeaderBoard(quizId) {
    const leaderBoard = await this.redis.zrange(`QUIZ-SERICE:LEADER_BOARD:${quizId}`, 0, 10, 'WITHSCORES');

    return leaderBoard;
  }

}
