import {
  IsString,
  Matches,
  MinLength,
  MaxLength,
  IsNotEmpty,
} from 'class-validator';
import { AuthConstants } from '../utils/constants.auth';

export class LoginAuthDto {
  @IsString()
  @Matches(AuthConstants.USERNAME_REGEX, {
    message: 'Username is invalid',
  })
  @MinLength(3)
  @MaxLength(15)
  @IsNotEmpty()
  username: string;

  @IsString()
  @Matches(AuthConstants.PASSWORD_REGEX, {
    message: 'Password is invalid',
  })
  @MinLength(3)
  @MaxLength(15)
  @IsNotEmpty()
  password: string;
}
