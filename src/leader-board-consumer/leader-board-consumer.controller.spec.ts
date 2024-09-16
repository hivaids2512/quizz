import { Test, TestingModule } from '@nestjs/testing';
import { LeaderBoardConsumerController } from './leader-board-consumer.controller';

describe('LeaderBoardConsumerController', () => {
  let controller: LeaderBoardConsumerController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [LeaderBoardConsumerController],
    }).compile();

    controller = module.get<LeaderBoardConsumerController>(LeaderBoardConsumerController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
