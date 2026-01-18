import { Schema } from 'mongoose';

export interface IOrder {
  email: string;
  phone: string;
  tickets: { film: string; session: string; row: number; seat: number }[];
}

const ticketSchema = new Schema(
  {
    film: { type: String, required: true },
    session: { type: String, required: true },
    row: { type: Number, required: true },
    seat: { type: Number, required: true },
  },
  { _id: false },
);

export const OrderSchema = new Schema<IOrder>({
  email: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  tickets: {
    type: [ticketSchema],
    default: [],
  },
});
