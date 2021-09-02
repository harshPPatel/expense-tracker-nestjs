import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MongoRepository, ObjectID } from 'typeorm';
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

  async findOne(id: ObjectID | string) {
    return await this.expensesRepository.findOne(id);
  }

  async update(updateExpenseDto: UpdateExpenseDto, expense: Expense) {
    expense.title = updateExpenseDto.title;
    expense.amount = updateExpenseDto.amount;
    expense.date = new Date(updateExpenseDto.date);
    return await this.expensesRepository.save(expense);
  }

  async remove(expense: Expense) {
    return await this.expensesRepository.remove(expense);
  }
}
