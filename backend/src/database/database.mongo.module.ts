import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { filmSchema } from 'src/films/films.model';
import { OrderSchema } from 'src/order/order.models';

@Module({
  imports: [
    MongooseModule.forRoot(
      process.env.DATABASE_URL || 'mongodb://127.0.0.1:27017/afisha',
      {
        serverSelectionTimeoutMS: 3000,
      },
    ),
    MongooseModule.forFeature([
      { name: 'film', schema: filmSchema, collection: 'films' },
      { name: 'order', schema: OrderSchema, collection: 'orders' },
    ]),
  ],
  exports: [MongooseModule],
})
export class DatabaseMongoModule {}
