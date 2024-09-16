import { BadRequestException, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { Quiz } from '../shared/entities/quiz.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { QuizSession } from '../shared/entities/quiz-session.entity';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';
import * as dayjs from 'dayjs';
import Redis from 'ioredis';
import { InjectRedis } from '@liaoliaots/nestjs-redis';
import { LEADER_BOARD_REDIS_KEY, QUIZ_SESSION_REDIS_KEY } from '../shared/consts/index.const';
import { ClientKafka } from '@nestjs/microservices';

@Injectable()
export class QuizService {
  constructor(
    @InjectRepository(Quiz)
    private readonly quizRepository: Repository<Quiz>,
    @InjectRepository(QuizSession)
    private readonly quizSessionRepository: Repository<QuizSession>,
    @InjectRedis() private readonly redis: Redis,
    @Inject('LEADER_BOARD_KAFKA') private readonly kafka: ClientKafka,
  ) {}

  async joinQuiz(userId: string, userName: string, quizId: string): Promise<{ sessionId: string}> {
    const quiz = await this.quizRepository.findOne({ where: { id: quizId }});

    if (!quiz) {
      throw new NotFoundException('Quiz not found');
    }

    const userAbleToJoinQuiz = await this.checkUserAbleToJoinQuiz(userId, quizId);

    if (!userAbleToJoinQuiz) {
      throw new BadRequestException('User not able to join quiz');
    }

    const sessionId = await this.issueQuizSession(userId, userName, quizId);

    return { sessionId }
  }

  async answerQuiz(userId: string, userName: string, quizId: string): Promise<void> {
    const quiz = await this.quizRepository.findOne({ where: { id: quizId }});

    if (!quiz) {
      throw new NotFoundException('Quiz not found');
    }

    const quizScore = await this.calculateQuizScore(quizId);
    
    await this.redis.zadd(`${LEADER_BOARD_REDIS_KEY}:${quizId}`, quizScore, `${userId}::${userName}`);
    await this.kafka.emit('leaderboard-sync', JSON.stringify({ userId, quizId, score: quizScore }));    
  }

  private async checkUserAbleToJoinQuiz(userId: string, quizId: string) {
    return true;
  }

  private async issueQuizSession(userId: string, userName: string, quizId: string): Promise<string> {
    const session = await this.quizSessionRepository.insert({ userId, quizId, expiredAt: dayjs().add(15, 'minutes') });

    const sessionId = session.raw[0].id;
    await this.redis.set(`${QUIZ_SESSION_REDIS_KEY}:${sessionId}`, JSON.stringify({ userId, quizId, userName }));
    
    return sessionId;
  }

  private async calculateQuizScore(quizId: string) {
    // Returns a random integer from 0 to 100:
    return Math.floor(Math.random() * 101);
  }
}
