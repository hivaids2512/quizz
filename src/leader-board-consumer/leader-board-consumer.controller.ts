import { Controller } from '@nestjs/common';
import { EventPattern } from '@nestjs/microservices';
import { LeaderBoardConsumerService } from './leader-board-consumer.service';

@Controller('leader-board-consumer')
export class LeaderBoardConsumerController {
    constructor(private readonly leaderboardConsumer: LeaderBoardConsumerService) {}

    @EventPattern('leaderboard-sync')
    async handleUserCreate(data: { userId: string, quizId: string, score: number }) {
      await this.leaderboardConsumer.upsertScore(data);
    }
}
