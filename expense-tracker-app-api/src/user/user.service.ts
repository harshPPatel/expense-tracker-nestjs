import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MongoRepository } from 'typeorm';
import { SignupAuthDto } from '../auth/dto/signup-auth.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private usersRepository: MongoRepository<User>,
  ) {}

  async findAll(): Promise<User[]> {
    return await this.usersRepository.find();
  }

  async create(signupData: SignupAuthDto): Promise<User> {
    const user = new User();
    user.username = signupData.username;
    user.password = signupData.password;
    console.log(user);
    return await this.usersRepository.save(user);
    // TODO: Handle error with E11000 error: Use inceptor?? or try catch in auth service?
  }

  async findOne(username: string): Promise<User> {
    return await this.usersRepository.findOne({
      username,
      select: [
        'username',
        'createdAt',
        'currency',
        'expenseWarningLimit',
        'id',
        'quote',
        'theme',
        'updatedAt',
        // typeorm currently does not support -syntax to remove one column
      ],
    });
  }

  async delete(username: string) {
    // TODO: Delete all the data for this user before we delete the user!!!!
    return await this.usersRepository.deleteOne({
      username,
    });
  }
}
