import {
  Body,
  Controller,
  Delete,
  NotFoundException,
  Req,
} from '@nestjs/common';
import { IDeletedUserResponse } from './interfaces/deleted-user-response.interface';
import { UserService } from './user.service';

@Controller('/api/v1/user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  // TODO: return value?
  @Delete('delete')
  async deleteUser(@Req() req): Promise<IDeletedUserResponse> {
    const { username } = req.user;

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
