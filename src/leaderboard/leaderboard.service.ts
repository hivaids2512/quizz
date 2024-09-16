import { InjectRedis } from '@liaoliaots/nestjs-redis';
import { Injectable } from '@nestjs/common';
import Redis from 'ioredis';
import { LEADER_BOARD_REDIS_KEY } from '../shared/consts/index.const';

@Injectable()
export class LeaderboardService {
  constructor(@InjectRedis() private readonly redis: Redis) {}

  async getLeaderBoard(quizId) {
    const leaderBoard = await this.redis.zrange(`${LEADER_BOARD_REDIS_KEY}:${quizId}`, 0, 10);

    return this.parseLeaderBoard(leaderBoard);
  }

  parseLeaderBoard (data: string[]) {
    return data.map((item) => {
      const id = item.split('::')[0];
      const name = item.split('::')[1];
      const score = item.split('::')[2];
      return { id, name, score };
    })
  }
}
