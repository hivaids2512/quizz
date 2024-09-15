import { Controller, Get, Query } from '@nestjs/common';
import { LeaderboardService } from './leaderboard.service';

@Controller('leaderboards')
export class LeaderboardController {
  constructor(private readonly leaderBoardService: LeaderboardService) {}
  
  @Get()
  async getLeaderBoard(
    @Query('quizId') quizId: string,
  ): Promise<any> {
    return this.leaderBoardService.getLeaderBoard(quizId);
  }
}
