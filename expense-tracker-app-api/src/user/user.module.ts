import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BcryptUtility } from '../auth/utils/bcrypt.utility';
import { ExpenseModule } from '../expense/expense.module';
import { IncomeModule } from '../income/income.module';
import { User } from './entities/user.entity';
import { UserController } from './user.controller';
import { UserService } from './user.service';

@Module({
  imports: [TypeOrmModule.forFeature([User]), ExpenseModule, IncomeModule],
  providers: [UserService, BcryptUtility],
  exports: [UserService],
  controllers: [UserController],
})
export class UserModule {}
