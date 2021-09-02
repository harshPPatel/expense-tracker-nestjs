import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Post,
  Put,
  Req,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateIncomeDto } from './dto/create-income.dto';
import { UpdateIncomeDto } from './dto/update-income.dto';
import { Income } from './entities/income.entity';
import { IncomeService } from './income.service';

@Controller('api/v1/income')
export class IncomeController {
  constructor(private readonly incomeService: IncomeService) {}

  @Post('create')
  async create(@Req() req, @Body() createIncomeDto: CreateIncomeDto) {
    const username = req.user.username;
    const createdIncome = await this.incomeService.create(
      createIncomeDto,
      username,
    );
    return {
      income: createdIncome,
      message: 'Income Created Successfully',
      username: username,
    };
  }

  @Get()
  async findAll(@Req() req) {
    const username = req.user.username;
    const incomes = await this.incomeService.findAll(username);
    return {
      incomes,
      count: incomes.length,
      username,
    };
  }

  @Put('update')
  async update(@Req() req, @Body() updateIncomeDto: UpdateIncomeDto) {
    const username = req.user.username;
    const dbIncome: Income = await this.incomeService.findOne(
      updateIncomeDto.id,
    );
    if (!dbIncome) {
      throw new NotFoundException();
    }

    if (dbIncome.username !== username) {
      throw new UnauthorizedException();
    }
    const updatedIncome = await this.incomeService.update(
      updateIncomeDto,
      dbIncome,
    );

    return {
      message: 'Income Updated Successfully',
      updatedIncome,
      username,
    };
  }

  @Delete(':id')
  async remove(@Param('id') id: string, @Req() req) {
    const username = req.user.username;
    const dbIncome: Income = await this.incomeService.findOne(id);

    if (!dbIncome) {
      throw new NotFoundException();
    }

    if (dbIncome.username !== username) {
      throw new UnauthorizedException();
    }

    const deletedIncome = await this.incomeService.remove(dbIncome);

    return {
      message: 'Income removed successfully!',
      deletedIncome,
      username,
    };
  }
}
