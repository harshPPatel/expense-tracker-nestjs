import {
  IsDateString,
  IsNotEmpty,
  IsNumber,
  IsString,
  Min,
  MinLength,
} from 'class-validator';

export class CreateExpenseDto {
  @IsString()
  @MinLength(3)
  @IsNotEmpty()
  title: string;

  @IsNumber()
  @Min(0)
  @IsNotEmpty()
  amount: number;

  @IsDateString()
  @IsNotEmpty()
  date: Date;
}
