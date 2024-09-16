import { BadRequestException, Body, Controller, HttpCode, HttpStatus, Param, Post, UseGuards } from '@nestjs/common';
import { QuizService } from './quiz.service';
import { AuthGuard } from '../shared/guards/auth.guard';
import { QuizSession } from '../shared/decorators/quiz-session.decorator';
import { RequestSession } from '../shared/decorators/request-session.decorator';
import { QuizGuard } from '../shared/guards/quiz.guard';

@Controller('quizzes')
export class QuizController {
  constructor(private readonly quizService: QuizService) {}
  
  @Post('/:id/join')
  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthGuard)
  async joinQuiz(
    @Param('id') quizId: string,
    @RequestSession() session: any,
  ): Promise<{ sessionId: string}> {
    return this.quizService.joinQuiz(session.userId, session.userName, quizId);
  }

  @Post('/:id/answer')
  @HttpCode(HttpStatus.OK)
  @UseGuards(QuizGuard)
  async answerQuiz(
    @Param('id') quizId: string,
    @QuizSession() session: any,
  ): Promise<void> {
    if (quizId !== session.quizId) {
      throw new BadRequestException('Invalid session');
    }

    return this.quizService.answerQuiz(session.userId, session.userName, quizId);
  }
}
