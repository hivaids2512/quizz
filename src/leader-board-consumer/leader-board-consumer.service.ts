import { Injectable } from '@nestjs/common';
import { QuizScore } from '../shared/entities/quiz-score.entity';
import { DataSource } from 'typeorm';

@Injectable()
export class LeaderBoardConsumerService {
  constructor(private readonly dataSource: DataSource) {}
  
  async upsertScore(data: { userId: string, quizId: string, score: number }) {
    await this.dataSource.transaction(async (entityManager) => {
      await entityManager.getRepository(QuizScore).upsert(data, { conflictPaths: ['userId', 'quizId']})
    });
  }
}
