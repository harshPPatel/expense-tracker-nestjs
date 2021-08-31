import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MongoRepository } from 'typeorm';
import { CreateAuthDto } from '../auth/dto/create-auth.dto';
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

  async create(user: CreateAuthDto): Promise<User> {
    return await this.usersRepository.save(user);
    // TODO: Handle error with E11000 error: Use inceptor?? or try catch in auth service?
  }
}
