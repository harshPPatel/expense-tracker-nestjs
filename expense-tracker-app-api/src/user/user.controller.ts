import {
  Body,
  Controller,
  Delete,
  ForbiddenException,
  NotFoundException,
  Put,
  Req,
} from '@nestjs/common';
import { BcryptUtility } from '../auth/utils/bcrypt.utility';
import { ChangePasswordDto } from './dto/change-password.dto';
import { IDeletedUserResponse } from './interfaces/deleted-user-response.interface';
import { UserService } from './user.service';

@Controller('/api/v1/user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly bcryptUtility: BcryptUtility,
  ) {}

  @Put('changePassword')
  async changePassword(
    @Req() req,
    @Body() changePasswordDto: ChangePasswordDto,
  ) {
    const username = req.user.username;

    const dbUser = await this.userService.findOne(username);

    const isCurrentPasswordValid = await this.bcryptUtility.isMatched(
      changePasswordDto.current_password,
      dbUser.password,
    );

    if (!isCurrentPasswordValid) {
      throw new ForbiddenException('Current Password is invalid');
    }

    const newHashedPassword = await this.bcryptUtility.hash(
      changePasswordDto.new_password,
    );

    dbUser.password = newHashedPassword;

    await this.userService.update(dbUser);

    return {
      username,
      message: 'Your password has changed successfully!',
    };
  }

  // TODO: return value?
  @Delete('delete')
  async deleteUser(@Req() req): Promise<IDeletedUserResponse> {
    const { username } = req.user;

    // TODO: Delete all user data as well (should be in service)

    const dbResults = await this.userService.delete(username);

    if (dbResults.deletedCount !== 1) {
      throw new NotFoundException('We could not find the requested user');
    }

    return {
      message: 'User has been deleted successfully!',
      deletedUser: username,
    };
  }
}
