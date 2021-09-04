import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BcryptUtility } from '../auth/utils/bcrypt.utility';
import { User } from './entities/user.entity';
import { UserController } from './user.controller';
import { UserService } from './user.service';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  providers: [UserService, BcryptUtility],
  exports: [UserService],
  controllers: [UserController],
})
export class UserModule {}
