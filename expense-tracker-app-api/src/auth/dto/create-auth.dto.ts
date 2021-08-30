import {
  IsNotEmpty,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';
import { AuthConstants } from '../utils/constants.auth';
import { Match } from '../utils/match.decorator';

export class CreateAuthDto {
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

  @Match('password', {
    message: 'confirmMessage should match the value of password',
  })
  confirmPassword: string;
}
