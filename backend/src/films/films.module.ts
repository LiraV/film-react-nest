import { Module } from '@nestjs/common';
import { FilmsController } from './films.controller';
import { FilmsService } from './films.service';
import { filmSchema } from './films.model';
import { MongooseModule } from '@nestjs/mongoose';

export const FILM_MODEL = 'FILM_MODEL';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Film', schema: filmSchema, collection: 'films' },
    ]),
  ],
  controllers: [FilmsController],
  providers: [FilmsService],
  exports: [FilmsService],
})
export class FilmsModule {}
