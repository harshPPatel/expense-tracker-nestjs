import { Controller, Get, Query, Req } from '@nestjs/common';
import { StatementService } from './statement.service';

@Controller('api/v1/statement')
export class StatementController {
  constructor(private readonly statementService: StatementService) {}

  @Get()
  async findAll(
    @Req() req,
    @Query('month') month: number = null,
    @Query('year') year: number = null,
  ) {
    const username = req.user.username;
    const statements = await this.statementService.findAll(
      username,
      month,
      year,
    );

    const totalAmounts = this.statementService.getTotalAmounts(statements);

    return {
      statements,
      count: statements.length,
      totalExpenses: totalAmounts.totalExpenseAmount,
      totalIncomes: totalAmounts.totalIncomeAmount,
      username,
    };
  }
}
