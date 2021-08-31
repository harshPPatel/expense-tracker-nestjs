import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserModule } from '../user/user.module';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './local.strategy';
import { BcryptUtility } from './utils/bcrypt.utility';
import { JwtModule } from '@nestjs/jwt';
import { AuthConstants } from './utils/constants.auth';

@Module({
  imports: [
    UserModule,
    PassportModule,
    JwtModule.register({
      secret: AuthConstants.JWT_SECRET,
      signOptions: {
        algorithm: 'HS256',
        expiresIn: '2 days',
      }, // should we move it to different file? is that good code or bad code?
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, LocalStrategy, BcryptUtility],
})
export class AuthModule {}
