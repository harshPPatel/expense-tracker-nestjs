import { Column, Entity } from 'typeorm';
import { BaseEntity } from '../../entities/base.entity';
import { QuotesUtility } from '../utils/quotes.utility';
import { UsersConstants } from '../utils/users.constants';

// TODO: Try implementing database level validation
@Entity()
export class User extends BaseEntity {
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
  theme = UsersConstants.DEFAULT_THEME;

  @Column({ length: 1, nullable: false })
  currency = UsersConstants.DEFAULT_CURRENCY;

  @Column({ nullable: false })
  expenseWarningLimit = UsersConstants.DEFAULT_EXPENSE_WARNING_LIMIT;
}
