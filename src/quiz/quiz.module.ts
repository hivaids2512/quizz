import { Module } from '@nestjs/common';
import { QuizController } from './quiz.controller';
import { QuizService } from './quiz.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Quiz } from '../shared/entities/quiz.entity';
import { QuizSession } from '../shared/entities/quiz-session.entity';

@Module({
  imports:[
    TypeOrmModule.forFeature([
      Quiz,
      QuizSession,
    ]),
  ],
  controllers: [QuizController],
  providers: [QuizService]
})
export class QuizModule {}
