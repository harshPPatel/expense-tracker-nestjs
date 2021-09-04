import {
  IsNotEmpty,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';
import { AuthConstants } from '../../auth/utils/constants.auth';
import { Match } from '../../auth/utils/match.decorator';

export class ChangePasswordDto {
  @IsString()
  @Matches(AuthConstants.PASSWORD_REGEX, {
    message: 'Password is invalid',
  })
  @MinLength(3)
  @MaxLength(15)
  @IsNotEmpty()
  current_password: string;

  @IsString()
  @Matches(AuthConstants.PASSWORD_REGEX, {
    message: 'Password is invalid',
  })
  @MinLength(3)
  @MaxLength(15)
  @IsNotEmpty()
  new_password: string;

  @Match('new_password', {
    message: 'repeat_password should match the value of new_password',
  })
  repeat_password: string;
}
