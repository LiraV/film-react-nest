import { Module } from '@nestjs/common';
import { OrderController } from './order.controller';
import { OrderService } from './order.service';
import { OrderSchema } from './order.models';
import { MongooseModule } from '@nestjs/mongoose';
import { FilmsModule } from 'src/films/films.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Order', schema: OrderSchema, collection: 'orders' },
    ]),
    FilmsModule,
  ],
  controllers: [OrderController],
  providers: [OrderService],
})
export class OrderModule {}
