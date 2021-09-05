import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MongoRepository } from 'typeorm';
import { SignupAuthDto } from '../auth/dto/signup-auth.dto';
import { ExpenseService } from '../expense/expense.service';
import { IncomeService } from '../income/income.service';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private usersRepository: MongoRepository<User>,
    private expenseService: ExpenseService,
    private incomeService: IncomeService,
  ) {}

  async findAll(): Promise<User[]> {
    return await this.usersRepository.find();
  }

  async create(signupData: SignupAuthDto): Promise<User> {
    const user = new User();
    user.username = signupData.username;
    user.password = signupData.password;
    console.log(user);
    return await this.usersRepository.save(user);
    // TODO: Handle error with E11000 error: Use inceptor?? or try catch in auth service?
  }

  async update(updatedUser: User) {
    return await this.usersRepository.save(updatedUser);
  }

  async findOne(username: string): Promise<User> {
    return await this.usersRepository.findOne({
      username,
    });
  }

  async delete(username: string) {
    await this.expenseService.removeAllUserExpenses(username);
    await this.incomeService.removeAllUserIncomes(username);
    return await this.usersRepository.deleteOne({
      username,
    });
  }
}
