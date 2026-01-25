import { Controller, Get, Param } from '@nestjs/common';
import { FilmsService } from './films.service';

@Controller('/films')
export class FilmsController {
  constructor(private readonly filmService: FilmsService) {}

  @Get()
  async getFilms() {
    const films = await this.filmService.findAll();
    return { total: films.length, items: films };
  }

  @Get(':id/schedule')
  async getFilmSchedule(@Param('id') id: string) {
    const film = await this.filmService.findByIdWithSchedule(id);
    const schedule = film.schedule ?? [];
    const filmInfo = film.toObject();
    delete film.schedule;
    return {
      ...filmInfo,
      total: schedule.length,
      items: film.schedule,
    };
  }
}
