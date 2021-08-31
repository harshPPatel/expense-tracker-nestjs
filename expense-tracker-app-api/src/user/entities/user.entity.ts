import { SerializeOptions } from '@nestjs/common';
import { Exclude, Expose } from 'class-transformer';
import {
  Column,
  CreateDateColumn,
  Entity,
  ObjectID,
  ObjectIdColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { QuotesUtility } from '../utils/quotes.utility';

// TODO: Try implementing database level validation
@Entity()
export class User {
  @ObjectIdColumn()
  id: ObjectID;

  @Column({ unique: true, nullable: false })
  username: string;

  @Column({ nullable: false })
  password: string;

  @Column({ default: QuotesUtility.getRandomQuote(), nullable: false })
  quote: string;

  @Column({ default: 0, nullable: false })
  theme: number;

  @Column({ default: '$', length: 1, nullable: false })
  currency: string;

  @Column({ default: 1000, nullable: false })
  expenseWarningLimit: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
