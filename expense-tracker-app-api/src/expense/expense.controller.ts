import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Req,
  Put,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { ExpenseService } from './expense.service';
import { CreateExpenseDto } from './dto/create-expense.dto';
import { UpdateExpenseDto } from './dto/update-expense.dto';
import { Expense } from './entities/expense.entity';

@Controller('/api/v1/expense')
export class ExpenseController {
  constructor(private readonly expenseService: ExpenseService) {}

  @Post('create')
  async create(@Req() req, @Body() createExpenseDto: CreateExpenseDto) {
    const username = req.user.username;
    const createdExpense = await this.expenseService.create(
      createExpenseDto,
      username,
    );
    return {
      expense: createdExpense,
      message: 'Expense Created Successfully',
      username: username,
    };
  }

  @Get()
  async findAll(@Req() req) {
    const username = req.user.username;
    const expenses = await this.expenseService.findAll(username);
    return {
      expenses,
      count: expenses.length,
      username,
    };
  }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.expenseService.findOne(id);
  // }

  @Put('update')
  async update(@Req() req, @Body() updateExpenseDto: UpdateExpenseDto) {
    const username = req.user.username;
    const dbExpense: Expense = await this.expenseService.findOne(
      updateExpenseDto.id,
    );
    if (!dbExpense) {
      throw new NotFoundException();
    }

    if (dbExpense.username !== username) {
      throw new UnauthorizedException();
    }
    const updatedExpense = await this.expenseService.update(
      updateExpenseDto,
      dbExpense,
    );

    return {
      message: 'Expense Updated Successfully',
      updatedExpense,
      username,
    };
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.expenseService.remove(+id);
  }
}
