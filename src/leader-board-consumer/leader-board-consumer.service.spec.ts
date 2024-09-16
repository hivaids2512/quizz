import { Test, TestingModule } from '@nestjs/testing';
import { LeaderBoardConsumerService } from './leader-board-consumer.service';

describe('LeaderBoardConsumerService', () => {
  let service: LeaderBoardConsumerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [LeaderBoardConsumerService],
    }).compile();

    service = module.get<LeaderBoardConsumerService>(LeaderBoardConsumerService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
