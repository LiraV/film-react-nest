import { BadRequestException, Injectable } from '@nestjs/common';
import { OrderDto } from './dto/order.dto';
import { FilmsService } from '../films/films.service';

@Injectable()
export class OrderService {
  constructor(private filmService: FilmsService) {}

  async create(order: OrderDto) {
    const items: Array<{
      film: string;
      session: string;
      daytime: string;
      hall: number;
      row: number;
      seat: number;
      price: number;
    }> = [];

    for (const t of order.tickets) {
      const filmDoc = await this.filmService.findByIdWithSchedule(t.film);
      if (!filmDoc) throw new BadRequestException('Фильм не найден');

      const scheduleItem = (filmDoc.schedule ?? []).find(
        (s) => s.id === t.session,
      );
      if (!scheduleItem) throw new BadRequestException('Сеанс не найден');

      const key = `${t.row}:${t.seat}`;

      const taken = await this.filmService.takeSeat(t.film, t.session, key);
      if (taken.modifiedCount === 0)
        throw new BadRequestException('Место занято');

      items.push({
        film: t.film,
        session: t.session,
        daytime: scheduleItem.daytime,
        hall: scheduleItem.hall,
        row: t.row,
        seat: t.seat,
        price: scheduleItem.price,
      });
    }

    return { total: items.length, items };
  }
}
