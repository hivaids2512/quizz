import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { BaseEntity } from './base.entity';

@Entity()
export class Quiz extends BaseEntity{
  @Column()
  title: string;

  @Column()
  timeLimit: number; // In seconds
}