import { Expense } from '../../expense/entities/expense.entity';
import { StatementTypes } from '../utils/statement-types.enum';

export interface Statement extends Expense {
  type: StatementTypes;
}
