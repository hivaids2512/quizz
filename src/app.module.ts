import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { QuizModule } from './quiz/quiz.module';
import { RedisModule } from '@liaoliaots/nestjs-redis';
import { LeaderboardModule } from './leaderboard/leaderboard.module';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { LeaderBoardConsumerModule } from './leader-board-consumer/leader-board-consumer.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    RedisModule.forRoot({
      config: {
        host: process.env.REDIS_HOST,
          port: parseInt(process.env.REDIS_PORT, 10),
      }
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT as string, 10) || 5432,
      username: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      entities: [`${__dirname}/**/*.entity{.ts,.js}`],
      synchronize: true,
    }),
    QuizModule,
    LeaderboardModule,
    LeaderBoardConsumerModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
