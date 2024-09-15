import { Body, Controller, HttpCode, HttpStatus, Param, Post } from '@nestjs/common';
import { QuizService } from './quiz.service';

@Controller('quizzes')
export class QuizController {
  constructor(private readonly quizService: QuizService) {}
  
  @Post('/:id/join')
  @HttpCode(HttpStatus.OK)
  async joinQuiz(
    @Param('id') quizId: string,
  ): Promise<{ sessionId: string}> {
    const userId = '50587d48-83c6-4276-abd7-98a646f83d79';
    return this.quizService.joinQuiz(userId, quizId);
  }

  @Post('/:id/answer')
  @HttpCode(HttpStatus.OK)
  async answerQuiz(
    @Param('id') quizId: string,
  ): Promise<void> {
    const userId = '50587d48-83c6-4276-abd7-98a646f83d79';
    return this.quizService.answerQuiz(userId, quizId);
  }
}
