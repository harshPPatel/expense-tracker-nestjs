import { Controller, Get, Query, Req } from '@nestjs/common';
import { StatementService } from './statement.service';

@Controller('api/v1/statement')
export class StatementController {
  constructor(private readonly statementService: StatementService) {}

  @Get()
  async findAll(
    @Req() req,
    @Query('month') month: number = null,
    @Query('year') year: number = null,
  ) {
    const username = req.user.username;
    const statements = await this.statementService.findAll(
      username,
      month,
      year,
    );

    // TODO: Complete post processing on statements
    // shuold be done inside statement service!!!!
    return {
      statements,
    };
  }
}
