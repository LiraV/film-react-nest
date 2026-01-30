import { Module } from '@nestjs/common';
import { FilmsController } from './films.controller';
import { FilmsService } from './films.service';
import { filmSchema } from './films.model';
import { MongooseModule } from '@nestjs/mongoose';
import {
  AppFilmsRepository,
  MongoFilmsRepository,
  PgFilmsRepository,
} from 'src/repository/films.repository';
import { DatabasePgModule } from 'src/database/database.pg.module';
import { FILMS_REPO } from 'src/repository/films.repository';

export const FILM_MODEL = 'FILM_MODEL';

@Module({
  imports: [
    DatabasePgModule,
    MongooseModule.forFeature([
      { name: 'Film', schema: filmSchema, collection: 'films' },
    ]),
  ],
  controllers: [FilmsController],
  providers: [
    FilmsService,
    MongoFilmsRepository,
    PgFilmsRepository,
    AppFilmsRepository,

    { provide: FILMS_REPO, useExisting: AppFilmsRepository },
  ],
  exports: [FilmsService],
})
export class FilmsModule {}
