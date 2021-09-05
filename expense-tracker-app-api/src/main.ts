import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import * as dotenv from 'dotenv';
import * as helmet from 'helmet';
import { AppConstants } from './app.constants';
import { AppModule } from './app.module';

dotenv.config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: [
      AppConstants.IS_PRODUCTION
        ? AppConstants.PRODUCTION_CLIENT_URL
        : AppConstants.DEVELOPMENT_CLIENT_URL,
    ],
  });
  app.use(helmet());
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(3000);
}
bootstrap();
