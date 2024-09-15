import { Column, Entity } from 'typeorm';
import { BaseEntity } from './base.entity';

@Entity()
export class QuizSession extends BaseEntity {
  @Column()
  quizId: string;

  @Column()
  userId: string;

  @Column()
  expiredAt: Date;
}