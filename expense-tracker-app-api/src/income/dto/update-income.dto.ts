import { IsMongoId, IsNotEmpty } from 'class-validator';
import { ObjectID } from 'typeorm';
import { CreateIncomeDto } from './create-income.dto';

export class UpdateIncomeDto extends CreateIncomeDto {
  @IsMongoId()
  @IsNotEmpty()
  id: ObjectID;
}
