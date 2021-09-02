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
import { CreateExpenseDto } from './dto/create-expense.dto';
import { UpdateExpenseDto } from './dto/update-expense.dto';
import { Expense } from './entities/expense.entity';
import { ExpenseService } from './expense.service';

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
  async remove(@Param('id') id: string, @Req() req) {
    const username = req.user.username;
    // const expenseId = ObjectID.createFromHexString(id);
    const dbExpense: Expense = await this.expenseService.findOne(id);

    if (!dbExpense) {
      throw new NotFoundException();
    }

    if (dbExpense.username !== username) {
      throw new UnauthorizedException();
    }

    const deletedExpense = await this.expenseService.remove(dbExpense);

    return {
      message: 'Expense removed successfully!',
      deletedExpense,
      username,
    };
  }
}
