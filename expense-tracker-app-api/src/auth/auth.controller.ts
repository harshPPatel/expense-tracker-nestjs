import { Controller, Post, Body, UseGuards, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignupAuthDto } from './dto/signup-auth.dto';
import { LocalAuthGuard } from './local-auth.guard';
import { Public } from './public.decorator';

// TODO: Use built in version control???
@Controller('/api/v1/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Post('signup')
  async signup(@Body() signupAuthDto: SignupAuthDto) {
    delete signupAuthDto.confirmPassword;
    const { password, id, ...serializedUser } = await this.authService.signup(
      signupAuthDto,
    );
    // TODO: This is a bad code
    return serializedUser;
  }

  @Public()
  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Req() req) {
    return this.authService.login(req.user);
  }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.authService.findOne(+id);
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateAuthDto: UpdateAuthDto) {
  //   return this.authService.update(+id, updateAuthDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.authService.remove(+id);
  // }
}
