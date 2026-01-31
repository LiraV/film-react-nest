import { Injectable, Inject } from '@nestjs/common';
import { FILMS_REPO, FilmsRepository } from '../repository/films.repository';

@Injectable()
export class FilmsService {
  constructor(@Inject(FILMS_REPO) private repo: FilmsRepository) {}

  findAll() {
    return this.repo.findAll();
  }

  findByIdWithSchedule(id: string) {
    return this.repo.findByIdWithSchedule(id);
  }

  async takeSeat(filmId: string, sessionId: string, place: string) {
    return this.repo.takeSeat(filmId, sessionId, place);
  }
}
