//TODO описать DTO для запросов к /films
export class FilmDto {
  id: string;
  title: string;
}

export class FilmScheduleDto extends FilmDto {
  schedule: unknown[];
}
