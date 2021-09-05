import {
  Body,
  Controller,
  Delete,
  ForbiddenException,
  Get,
  NotFoundException,
  Put,
  Req,
} from '@nestjs/common';
import { BcryptUtility } from '../auth/utils/bcrypt.utility';
import { ChangeCurrencyDto } from './dto/change-currency.dto';
import { ChangePasswordDto } from './dto/change-password.dto';
import { ChangeQuoteDto } from './dto/change-quote.dto';
import { ChangeThemeDto } from './dto/change-theme.dto';
import { IDeletedUserResponse } from './interfaces/deleted-user-response.interface';
import { UserService } from './user.service';
import { QuotesUtility } from './utils/quotes.utility';

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

  @Get('quote')
  async getQuote(@Req() req) {
    const username = req.user.username;
    const dbUser = await this.userService.findOne(username);

    return {
      username,
      quote: dbUser.quote,
    };
  }

  @Put('quote/update')
  async updateQuote(@Req() req, @Body() changeQuoteDto: ChangeQuoteDto) {
    const username = req.user.username;

    const dbUser = await this.userService.findOne(username);

    if (changeQuoteDto.isRandom) {
      dbUser.quote = QuotesUtility.getRandomQuote();
    } else {
      dbUser.quote = changeQuoteDto.quote;
    }

    await this.userService.update(dbUser);

    return {
      username,
      message: 'Quote has been updated successfully!',
      updatedQuote: dbUser.quote,
    };
  }

  @Get('theme')
  async getTheme(@Req() req) {
    const username = req.user.username;
    const dbUser = await this.userService.findOne(username);

    return {
      username,
      theme: dbUser.theme,
    };
  }

  @Put('theme/update')
  async updateTheme(@Req() req, @Body() changeThemeDto: ChangeThemeDto) {
    const username = req.user.username;

    const dbUser = await this.userService.findOne(username);

    dbUser.theme = changeThemeDto.theme;

    await this.userService.update(dbUser);

    return {
      username,
      message: 'Theme has been updated successfully!',
      updatedTheme: dbUser.theme,
    };
  }

  @Get('currency')
  async getCurrency(@Req() req) {
    const username = req.user.username;
    const dbUser = await this.userService.findOne(username);

    return {
      username,
      currency: dbUser.currency,
    };
  }

  @Put('currency/update')
  async updateCurrency(
    @Req() req,
    @Body() changeCurrencyDto: ChangeCurrencyDto,
  ) {
    const username = req.user.username;

    const dbUser = await this.userService.findOne(username);

    dbUser.currency = changeCurrencyDto.currency;

    await this.userService.update(dbUser);

    return {
      username,
      message: 'Currency has been updated successfully!',
      updatedCurrency: dbUser.currency,
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
