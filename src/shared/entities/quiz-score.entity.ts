import { Column, Entity, Unique } from 'typeorm';
import { BaseEntity } from './base.entity';

@Entity()
@Unique(['quizId', 'userId'])
export class QuizScore extends BaseEntity {
  @Column()
  quizId: string;

  @Column()
  userId: string;

  @Column()
  score: number;
}