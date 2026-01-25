import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import * as path from 'node:path';

import { configProvider } from './app.config.provider';
import { FilmsModule } from './films/films.module';
import { OrderModule } from './order/order.module';
import { StaticController } from './static.controller';
import { ServeStaticModule } from '@nestjs/serve-static';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
    }),
    FilmsModule,
    OrderModule,
    MongooseModule.forRoot(
      process.env.DATABASE_URL || 'mongodb://127.0.0.1:27017/afisha',
      {
        serverSelectionTimeoutMS: 3000,
      },
    ),
    ServeStaticModule.forRoot({
      rootPath: path.resolve(__dirname, '..', 'public', 'content', 'afisha'),
      serveRoot: '/content/afisha',
      serveStaticOptions: {
        index: false,
      },
    }),
  ],
  controllers: [StaticController],
  providers: [configProvider],
})
export class AppModule {}
