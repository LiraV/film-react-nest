import { Controller, Get, Param } from '@nestjs/common';
import { FilmsService } from './films.service';

@Controller('/films')
export class FilmsController {
  constructor(private readonly filmService: FilmsService) {}

  @Get()
  async getFilms() {
    const films = await this.filmService.findAll();
    return { items: films };
  }

  @Get(':id/schedule')
  async getFilmSchedule(@Param('id') id: string) {
    const film = await this.filmService.findByIdWithSchedule(id);
    return { items: film.schedule };
  }
}
