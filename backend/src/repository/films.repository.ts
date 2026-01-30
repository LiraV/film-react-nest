import { Injectable } from '@nestjs/common';
import { IFilm } from '../films/films.model';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { InjectRepository } from '@nestjs/typeorm';
import { FilmEntity } from 'src/database/entities/film.entity';
import { ScheduleEntity } from 'src/database/entities/schedule.entity';
import { Repository } from 'typeorm';

export interface FilmsRepository {
  findAll(): Promise<any[]>;
  findByIdWithSchedule(id: string): Promise<any | null>;
  takeSeat(
    filmId: string,
    sessionId: string,
    place: string,
  ): Promise<{ modifiedCount: number }>;
}

export const FILMS_REPO = 'FILMS_REPO';

@Injectable()
export class MongoFilmsRepository implements FilmsRepository {
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

@Injectable()
export class PgFilmsRepository implements FilmsRepository {
  constructor(
    @InjectRepository(FilmEntity) private filmsRepo: Repository<FilmEntity>,
    @InjectRepository(ScheduleEntity)
    private scheduleRepo: Repository<ScheduleEntity>,
  ) {}

  findAll() {
    return this.filmsRepo.find();
  }

  findByIdWithSchedule(id: string) {
    return this.filmsRepo.findOne({
      where: { id },
      relations: { schedule: true },
    });
  }

  async takeSeat(filmId: string, sessionId: string, place: string) {
    const s = await this.scheduleRepo.findOne({
      where: { id: sessionId, filmId },
    });
    if (!s) return { modifiedCount: 0 };

    const takenArr = (s.taken ?? '')
      .split(',')
      .map((x) => x.trim())
      .filter(Boolean);

    if (takenArr.includes(place)) return { modifiedCount: 0 };

    takenArr.push(place);
    s.taken = takenArr.join(',');
    await this.scheduleRepo.save(s);
    return { modifiedCount: 1 };
  }
}

@Injectable()
export class AppFilmsRepository implements FilmsRepository {
  constructor(
    private mongo: MongoFilmsRepository,
    private pg: PgFilmsRepository,
  ) {}

  private get repo() {
    return process.env.DATABASE_DRIVER === 'postgres' ? this.pg : this.mongo;
  }

  findAll() {
    return this.repo.findAll();
  }

  findByIdWithSchedule(id: string) {
    return this.repo.findByIdWithSchedule(id);
  }

  takeSeat(filmId: string, sessionId: string, place: string) {
    return this.repo.takeSeat(filmId, sessionId, place);
  }
}
