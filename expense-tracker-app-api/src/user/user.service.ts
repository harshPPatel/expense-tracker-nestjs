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
    return await this.usersRepository.findOne({ username });
  }
}
