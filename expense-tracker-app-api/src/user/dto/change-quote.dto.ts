import { IsBoolean, IsNotEmpty, IsString, ValidateIf } from 'class-validator';

export class ChangeQuoteDto {
  @IsBoolean()
  @IsNotEmpty()
  isRandom: boolean;

  @ValidateIf((data) => data.isRandom === false)
  @IsString()
  @IsNotEmpty()
  quote: string;
}
