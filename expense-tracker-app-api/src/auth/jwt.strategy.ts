import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthConstants } from './utils/constants.auth';
import { IJwtPayload } from './interfaces/jwt-payload.interface';
import { UserService } from '../user/user.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly userService: UserService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: AuthConstants.JWT_SECRET,
      algorithm: 'HS256', // move these two common option and use that common variable here and in auth module
    });
  }

  async validate(payload: IJwtPayload) {
    const dbUser = await this.userService.findOne(payload.username);
    if (!dbUser) {
      throw new UnauthorizedException();
    }
    return { userId: payload.sub, username: payload.username };
  }
}
