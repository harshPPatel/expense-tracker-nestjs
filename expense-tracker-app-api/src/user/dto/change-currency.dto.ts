import { IsNotEmpty, IsString, Matches, MaxLength } from 'class-validator';
import { UsersConstants } from '../utils/users.constants';

export class ChangeCurrencyDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(1)
  @Matches(UsersConstants.CURRENCY_REGEX, {
    message: 'Currency value is invalid',
  })
  currency: string;
}
