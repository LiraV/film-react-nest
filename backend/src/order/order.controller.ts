import { Body, Controller, Post } from '@nestjs/common';
import { OrderDto } from './dto/order.dto';
import { OrderService } from './order.service';

@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post()
  async createOrder(@Body() dto: OrderDto) {
    await this.orderService.create(dto);

    return {
      total: dto.tickets.length,
      items: dto.tickets.map((t) => ({
        film: t.film,
        session: t.session,
        row: t.row,
        seat: t.seat,
      })),
    };
  }
}
