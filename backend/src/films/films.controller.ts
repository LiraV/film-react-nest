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
    const schedule = (film as any).schedule ?? [];
    const filmInfo =
      typeof (film as any).toObject === 'function'
        ? (film as any).toObject()
        : film;
    delete (film as any).schedule;
    return {
      ...(filmInfo as any),
      total: schedule.length,
      items: schedule,
    };
  }
}
