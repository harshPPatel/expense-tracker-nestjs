import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MongoRepository } from 'typeorm';
import { CreateExpenseDto } from './dto/create-expense.dto';
import { UpdateExpenseDto } from './dto/update-expense.dto';
import { Expense } from './entities/expense.entity';

@Injectable()
export class ExpenseService {
  constructor(
    @InjectRepository(Expense)
    private readonly expensesRepository: MongoRepository<Expense>,
  ) {}

  async create(
    createExpenseDto: CreateExpenseDto,
    username: string,
  ): Promise<Expense> {
    const expense = new Expense();
    expense.title = createExpenseDto.title;
    expense.amount = createExpenseDto.amount;
    expense.date = new Date(createExpenseDto.date);
    expense.username = username;
    return await this.expensesRepository.save(expense);
  }

  async findAll(username: string): Promise<Expense[]> {
    return await await this.expensesRepository.find({
      username,
      order: { date: 'DESC' },
    });
  }

  findOne(id: number) {
    return `This action returns a #${id} expense`;
  }

  update(id: number, updateExpenseDto: UpdateExpenseDto) {
    return `This action updates a #${id} expense`;
  }

  remove(id: number) {
    return `This action removes a #${id} expense`;
  }
}
