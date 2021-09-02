import { IsMongoId, IsNotEmpty } from 'class-validator';
import { ObjectID } from 'typeorm';
import { CreateExpenseDto } from './create-expense.dto';

export class UpdateExpenseDto extends CreateExpenseDto {
  @IsMongoId()
  @IsNotEmpty()
  id: ObjectID;
}
