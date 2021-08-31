import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { AuthConstants } from './utils/constants.auth';
import { IJwtPayload } from './interfaces/jwt-payload.interface';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: AuthConstants.JWT_SECRET,
      algorithm: 'HS256', // move these two common option and use that common variable here and in auth module
    });
  }

  async validate(payload: IJwtPayload) {
    return { userId: payload.sub, username: payload.username };
  }
}
