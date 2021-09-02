import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { DatabaseConstants } from './database.constants';
import { Expense } from './expense/entities/expense.entity';
import { ExpenseModule } from './expense/expense.module';
import { Income } from './income/entities/income.entity';
import { IncomeModule } from './income/income.module';
import { StatementController } from './statement/statement.controller';
import { StatementModule } from './statement/statement.module';
import { StatementService } from './statement/statement.service';
import { User } from './user/entities/user.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mongodb',
      host: 'localhost',
      port: DatabaseConstants.PORT,
      // username: '',
      // password: 'root',
      database: DatabaseConstants.DATABASE_NAME,
      entities: [User, Expense, Income],
      synchronize: true, // TODO: should be disabled in prod
    }),
    AuthModule,
    ExpenseModule,
    IncomeModule,
    StatementModule,
  ],
  controllers: [AppController, StatementController],
  providers: [AppService, StatementService],
})
export class AppModule {}
