import { Expense } from '../../expense/entities/expense.entity';
import { Income } from '../../income/entities/income.entity';

export interface StatementResponse {
  expenses: Expense[];
  incomes: Income[];
}
