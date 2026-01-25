import { Injectable } from '@nestjs/common';
import { IFilm } from './films.model';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class FilmsService {
  constructor(@InjectModel('Film') private filmModel: Model<IFilm>) {}

  findAll() {
    return this.filmModel.find().lean();
  }

  findByIdWithSchedule(id: string) {
    return this.filmModel.findOne({ id });
  }

  async takeSeat(filmId: string, sessionId: string, place: string) {
    return this.filmModel.updateOne(
      {
        id: filmId,
        'schedule.id': sessionId,
        'schedule.taken': { $ne: place },
      },
      {
        $push: { 'schedule.$.taken': place },
      },
    );
  }
}
