import { Injectable } from '@nestjs/common';
import { lastDayOfMonth } from 'date-fns';
import { ExpenseService } from '../expense/expense.service';
import { IncomeService } from '../income/income.service';
import { StatementResponse } from './interface/statements-response.interface';

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
  ): Promise<StatementResponse> {
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

    return {
      expenses,
      incomes,
    };
  }
}
