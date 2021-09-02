import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { DatabaseConstants } from './database.constants';
import { User } from './user/entities/user.entity';
import { UserModule } from './user/user.module';
import { ExpenseModule } from './expense/expense.module';
import { Expense } from './expense/entities/expense.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mongodb',
      host: 'localhost',
      port: DatabaseConstants.PORT,
      // username: '',
      // password: 'root',
      database: DatabaseConstants.DATABASE_NAME,
      entities: [User, Expense],
      synchronize: true, // TODO: should be disabled in prod
    }),
    AuthModule,
    ExpenseModule,
    // UserModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
