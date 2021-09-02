import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Req,
} from '@nestjs/common';
import { ExpenseService } from './expense.service';
import { CreateExpenseDto } from './dto/create-expense.dto';
import { UpdateExpenseDto } from './dto/update-expense.dto';

@Controller('/api/v1/expense')
export class ExpenseController {
  constructor(private readonly expenseService: ExpenseService) {}

  @Post('create')
  async create(@Req() req, @Body() createExpenseDto: CreateExpenseDto) {
    return await this.expenseService.create(
      createExpenseDto,
      req.user.username,
    );
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

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.expenseService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateExpenseDto: UpdateExpenseDto) {
    return this.expenseService.update(+id, updateExpenseDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.expenseService.remove(+id);
  }
}
