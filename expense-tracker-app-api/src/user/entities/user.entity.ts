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

  // Note: Way to set default values in Mongo + TypeORM
  // YOU NEED TO CREATE User INSTANCE AND PASS THAT TO save FUNCTION
  // CHECK USER SERVICE FOR REFERENCE
  @Column({ nullable: false })
  quote: string = QuotesUtility.getRandomQuote();

  @Column({ nullable: false })
  theme = 0;

  @Column({ length: 1, nullable: false })
  currency = '$';

  @Column({ nullable: false })
  expenseWarningLimit = 1000;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
