//TODO описать DTO для запросов к /films
export class ScheduleItemDto {
  id: string;
  daytime: string;
  hall: number;
  rows: number;
  seat: number;
  price: number;
  taken: string[];
}

export class FilmDto {
  id: string;
  rating: number;
  director: string;
  tags: string[];
  image: string;
  cover: string;
  title: string;
  about: string;
  description: string;
}

export class FilmScheduleDto extends FilmDto {
  schedule: ScheduleItemDto[];
}
