import { Injectable } from '@nestjs/common';
import { lastDayOfMonth } from 'date-fns';
import { ExpenseService } from '../expense/expense.service';
import { IncomeService } from '../income/income.service';
import { Statement } from './interface/statement.interface';
import { StatementTypes } from './utils/statement-types.enum';

@Injectable()
export class StatementService {
  constructor(
    private readonly expenseService: ExpenseService,
    private readonly incomeService: IncomeService,
  ) {}

  async findAll(
    username: string,
    month?: number,
    year?: number,
  ): Promise<Statement[]> {
    const date = new Date();
    const queryMonth = month ? month - 1 : date.getMonth();
    const queryYear = year ? year : date.getFullYear();

    const startDay = new Date(queryYear, queryMonth, 1);
    const endDay = lastDayOfMonth(startDay);

    const expenses = await this.expenseService.findAllWithDateLimit(
      username,
      startDay,
      endDay,
    );

    const incomes = await this.incomeService.findAllWithDateLimit(
      username,
      startDay,
      endDay,
    );

    const mappedExpenses: Statement[] = await expenses.map(
      (expense: Statement) => {
        expense.type = StatementTypes.EXPENSE;
        return expense;
      },
    );

    const mappedIncomes: Statement[] = incomes.map((income: Statement) => {
      income.type = StatementTypes.INCOME;
      return income;
    });

    const statements = [...mappedExpenses, ...mappedIncomes];

    const sortedStatements = statements.sort(
      (statementA: Statement, statementB: Statement) => {
        return statementB.date.getTime() - statementA.date.getTime();
      },
    );

    return sortedStatements;
  }

  getTotalAmounts(items: Statement[]) {
    let totalExpenseAmount = 0;
    let totalIncomeAmount = 0;
    items.forEach((statement) => {
      if (statement.type === StatementTypes.EXPENSE) {
        totalExpenseAmount += statement.amount;
      }
      if (statement.type === StatementTypes.INCOME) {
        totalIncomeAmount += statement.amount;
      }
    });
    return { totalExpenseAmount, totalIncomeAmount };
  }
}
