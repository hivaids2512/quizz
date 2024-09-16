import { InjectRedis } from '@liaoliaots/nestjs-redis';
import { Injectable } from '@nestjs/common';
import Redis from 'ioredis';
import { LEADER_BOARD_REDIS_KEY } from '../shared/consts/index.const';

@Injectable()
export class LeaderboardService {
  constructor(@InjectRedis() private readonly redis: Redis) {}

  async getLeaderBoard(quizId) {
    const leaderBoard = await this.redis.zrevrange(`${LEADER_BOARD_REDIS_KEY}:${quizId}`, 0, 10, 'WITHSCORES');

    return this.parseLeaderBoard(leaderBoard);
  }

  parseLeaderBoard (data: string[]) {
    const result = [];
    data.forEach((item, index) => {
      if (index % 2 === 0) {
        const id = item.split('::')[0];
        const name = item.split('::')[1];
        result.push({ id, name });
      } else {
        result[result.length - 1]['score'] = item;
      }
    });

    return result;
  }
}
