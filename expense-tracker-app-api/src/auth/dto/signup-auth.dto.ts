import {
  IsNotEmpty,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';
import { Match } from '../utils/match.decorator';
import { LoginAuthDto } from './login-auth.dto';

export class SignupAuthDto extends LoginAuthDto {
  @Match('password', {
    message: 'confirmMessage should match the value of password',
  })
  confirmPassword: string;
}
