import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import 'dotenv/config';
import { buildLogger } from './logger/logger.factory';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api/afisha');
  app.enableCors();
  app.useLogger(buildLogger());
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
