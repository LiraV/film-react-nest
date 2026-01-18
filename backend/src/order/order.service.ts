import { BadRequestException, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { IOrder } from './order.models';
import { OrderDto } from './dto/order.dto';
import { InjectModel } from '@nestjs/mongoose';
import { FilmsService } from 'src/films/films.service';

@Injectable()
export class OrderService {
  constructor(
    @InjectModel('Order') private orderModel: Model<IOrder>,
    private filmService: FilmsService,
  ) {}

  async create(order: OrderDto) {
    for (const t of order.tickets) {
      const filmDoc = await this.filmService.findByIdWithSchedule(t.film);
      if (!filmDoc) throw new BadRequestException('Фильм не найден');

      const scheduleItem = filmDoc.schedule.find((s) => s.id === t.session);
      if (!scheduleItem) throw new BadRequestException('Сеанс не найден');

      const key = `${t.row}:${t.seat}`;
      const taken = scheduleItem.taken ?? [];
      if (taken.includes(key)) {
        throw new BadRequestException('место занято');
      }
      scheduleItem.taken.push(key);
      await filmDoc.save();
    }
    const created = this.orderModel.create(order);
    return { items: (await created).tickets };
  }
}
