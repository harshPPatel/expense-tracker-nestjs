import { IsNotEmpty, IsNumber, Min } from 'class-validator';

export class ChangeExpenseWarningLimitDto {
  @IsNumber({ maxDecimalPlaces: 2 })
  @IsNotEmpty()
  @Min(0)
  expenseWarningLimit: number;
}
