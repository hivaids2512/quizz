import { Module } from '@nestjs/common';
import { QuizController } from './quiz.controller';
import { QuizService } from './quiz.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Quiz } from '../shared/entities/quiz.entity';
import { QuizSession } from '../shared/entities/quiz-session.entity';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports:[
    ConfigModule.forRoot({ isGlobal: true }),
    ClientsModule.register([
      {
        name: 'LEADER_BOARD_KAFKA',
        transport: Transport.KAFKA,
        options: {
          client: {
            clientId: 'auth',
            brokers: [process.env.KAFKA_BROKER],
          },
          producerOnlyMode: true,
          consumer: {
            groupId: 'auth-consumer',
          },
        },
      },
    ]),
    TypeOrmModule.forFeature([
      Quiz,
      QuizSession,
    ]),
  ],
  controllers: [QuizController],
  providers: [QuizService]
})
export class QuizModule {}
