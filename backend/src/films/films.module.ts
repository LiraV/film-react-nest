import { Module } from '@nestjs/common';
import { FilmsController } from './films.controller';
import { FilmsService } from './films.service';
import { filmSchema } from './films.model';
import { MongooseModule } from '@nestjs/mongoose';
import {
  AppFilmsRepository,
  MongoFilmsRepository,
  PgFilmsRepository,
} from '../repository/films.repository';
import { DatabasePgModule } from '../database/database.pg.module';
import { DatabaseMongoModule } from '../database/database.mongo.module';
import { FILMS_REPO } from '../repository/films.repository';

export const FILM_MODEL = 'FILM_MODEL';

const isPg = process.env.DATABASE_DRIVER === 'postgres';

@Module({
  /*imports: [
    DatabasePgModule,
    MongooseModule.forFeature([
      { name: 'Film', schema: filmSchema, collection: 'films' },
    ]),
  ],*/
  imports: [
    ...(isPg
      ? [DatabasePgModule]
      : [
          DatabaseMongoModule,
          MongooseModule.forFeature([{ name: 'Film', schema: filmSchema, collection: 'films' }]),
        ]),
  ],
  controllers: [FilmsController],
  /*  FilmsService,
    MongoFilmsRepository,
    PgFilmsRepository,
    AppFilmsRepository,

    { provide: FILMS_REPO, useExisting: AppFilmsRepository },
  ],*/
  providers: [
    FilmsService,

    ...(isPg
      ? [
          PgFilmsRepository,
          { provide: FILMS_REPO, useExisting: PgFilmsRepository },
        ]
      : [
          MongoFilmsRepository,
          { provide: FILMS_REPO, useExisting: MongoFilmsRepository },
        ]),
  ],
  exports: [FilmsService],
})
export class FilmsModule {}
