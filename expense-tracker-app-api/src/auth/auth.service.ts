import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from '../user/entities/user.entity';
import { UserService } from '../user/user.service';
import { LoginAuthDto } from './dto/login-auth.dto';
import { SignupAuthDto } from './dto/signup-auth.dto';
import { IJwtPayload } from './interfaces/jwt-payload.interface';

import { BcryptUtility } from './utils/bcrypt.utility';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly bcryptUtility: BcryptUtility,
    private readonly jwtService: JwtService,
  ) {}

  // This function does not need to throw exception as this is a service which works as a provider, not as controller. So avoid any user related exceptions in service files
  async validateUser(username: string, password: string): Promise<User> {
    const dbUser = await this.userService.findOne(username);
    const isMatchedPassword = await this.bcryptUtility.isMatched(
      password,
      dbUser.password,
    );

    if (dbUser && isMatchedPassword) {
      delete dbUser.password;
      return dbUser;
    }

    return null;
  }

  async signup(createAuthDto: SignupAuthDto): Promise<User> {
    createAuthDto.password = await this.bcryptUtility.hash(
      createAuthDto.password,
    );

    return await this.userService.create(createAuthDto);
  }

  async login(user: User) {
    const jwtPayload: IJwtPayload = { username: user.username, sub: user.id };

    return {
      username: user.username,
      token: this.jwtService.sign(jwtPayload),
      settings: {
        quote: user.quote,
        theme: user.theme,
        currency: user.currency,
        expenseWarningLimit: user.expenseWarningLimit,
      },
    };
  }
}
