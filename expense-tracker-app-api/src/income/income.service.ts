import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MongoRepository, ObjectID } from 'typeorm';
import { CreateIncomeDto } from './dto/create-income.dto';
import { UpdateIncomeDto } from './dto/update-income.dto';
import { Income } from './entities/income.entity';

@Injectable()
export class IncomeService {
  constructor(
    @InjectRepository(Income)
    private readonly incomesRepository: MongoRepository<Income>,
  ) {}

  async create(
    createIncomeDto: CreateIncomeDto,
    username: string,
  ): Promise<Income> {
    const income = new Income();
    income.title = createIncomeDto.title;
    income.amount = createIncomeDto.amount;
    income.date = new Date(createIncomeDto.date);
    income.username = username;
    return await this.incomesRepository.save(income);
  }

  async findAll(username: string): Promise<Income[]> {
    return await this.incomesRepository.find({
      where: {
        username,
      },
      order: { date: 'DESC' },
    });
  }

  async findAllWithDateLimit(
    username: string,
    startDate: Date,
    endDate: Date,
  ): Promise<Income[]> {
    return await this.incomesRepository.find({
      where: {
        username,
        date: { $gte: startDate, $lte: endDate },
      },
      order: { date: 'DESC' },
    });
  }

  async findOne(id: ObjectID | string) {
    return await this.incomesRepository.findOne(id);
  }

  async update(updateIncomeDto: UpdateIncomeDto, income: Income) {
    income.title = updateIncomeDto.title;
    income.amount = updateIncomeDto.amount;
    income.date = new Date(updateIncomeDto.date);
    return await this.incomesRepository.save(income);
  }

  async remove(income: Income) {
    return await this.incomesRepository.remove(income);
  }

  async removeAllUserIncomes(username: string) {
    return await this.incomesRepository.deleteMany({ username });
  }
}
