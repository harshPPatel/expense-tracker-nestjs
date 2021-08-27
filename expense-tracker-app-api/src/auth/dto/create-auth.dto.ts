import {
  Equals,
  IsNotEmpty,
  IsString,
  Matches,
  MaxLength,
  MinLength,
  ValidateIf,
} from 'class-validator';
import { PASSWORD_REGEX, USERNAME_REGEX } from '../utils/constants.auth';
import { Match } from '../utils/match.decorator';

export class CreateAuthDto {
  @IsString()
  @Matches(USERNAME_REGEX)
  @MinLength(3)
  @MaxLength(15)
  @IsNotEmpty()
  username: string;

  @IsString()
  @Matches(PASSWORD_REGEX)
  @MinLength(3)
  @MaxLength(15)
  @IsNotEmpty()
  password: string;

  @Match('password', {
    message: 'confirmMessage should match the value of password',
  })
  confirmPassword: string;
}
