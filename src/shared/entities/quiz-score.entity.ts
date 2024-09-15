import { Column, Entity } from 'typeorm';
import { BaseEntity } from './base.entity';

@Entity()
export class QuizScore extends BaseEntity {
  @Column()
  quizId: string;

  @Column()
  userId: string;

  @Column()
  score: number;
}