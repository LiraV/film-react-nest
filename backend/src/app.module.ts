import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import * as path from 'node:path';

import { configProvider } from './app.config.provider';
import { FilmsModule } from './films/films.module';
import { OrderModule } from './order/order.module';
import { StaticController } from './static.controller';
import { ServeStaticModule } from '@nestjs/serve-static';
import { DatabasePgModule } from './database/database.pg.module';
import { DatabaseMongoModule } from './database/database.mongo.module';

const dbModule =
  process.env.DATABASE_DRIVER === 'postgres'
    ? DatabasePgModule
    : DatabaseMongoModule;

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
    }),
    dbModule,
    FilmsModule,
    OrderModule,
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
