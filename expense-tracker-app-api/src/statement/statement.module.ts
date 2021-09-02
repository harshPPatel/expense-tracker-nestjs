import { Module } from '@nestjs/common';
import { ExpenseModule } from '../expense/expense.module';
import { IncomeModule } from '../income/income.module';
import { StatementController } from './statement.controller';
import { StatementService } from './statement.service';

@Module({
  imports: [IncomeModule, ExpenseModule],
  controllers: [StatementController],
  providers: [StatementService],
})
export class StatementModule {}
