import { Injectable, Logger } from '@nestjs/common';
import { User } from '../user/entities/user.entity';
import { UserService } from '../user/user.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { BcryptUtility } from './utils/bcrypt.utility';

@Injectable()
export class AuthService {
  constructor(private readonly userService: UserService) {}

  async signup(createAuthDto: CreateAuthDto): Promise<User> {
    const bcryptUtility = new BcryptUtility();
    createAuthDto.password = await bcryptUtility.hash(createAuthDto.password);

    return await this.userService.create(createAuthDto);
  }

  async findAll() {
    const data = await this.userService.findAll();
    console.log(data);
    return `This action returns all auth`;
  }

  findOne(id: number) {
    return `This action returns a #${id} auth`;
  }

  update(id: number, updateAuthDto: UpdateAuthDto) {
    return `This action updates a #${id} auth`;
  }

  remove(id: number) {
    return `This action removes a #${id} auth`;
  }
}
