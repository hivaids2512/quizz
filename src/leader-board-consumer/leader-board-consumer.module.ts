import { Module } from '@nestjs/common';
import { LeaderBoardConsumerController } from './leader-board-consumer.controller';
import { LeaderBoardConsumerService } from './leader-board-consumer.service';

@Module({
  controllers: [LeaderBoardConsumerController],
  providers: [LeaderBoardConsumerService]
})
export class LeaderBoardConsumerModule {}
