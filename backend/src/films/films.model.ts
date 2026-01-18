import { Schema } from 'mongoose';

export type TakenSeat = string;

export interface IScheduleItem {
  id: string;
  daytime: string;
  hall: number;
  rows: number;
  seats: number;
  price: number;
  taken: TakenSeat[];
}

export interface IFilm {
  id: string;
  rating: number;
  director: string;
  tags: string[];
  image: string;
  cover: string;
  title: string;
  about: string;
  description: string;
  schedule: IScheduleItem[];
}

export const scheduleSchema = new Schema<IScheduleItem>(
  {
    id: {
      type: String,
      required: true,
    },
    daytime: {
      type: String,
      required: true,
    },
    hall: {
      type: Number,
      required: true,
    },
    rows: {
      type: Number,
      required: true,
    },
    seats: {
      type: Number,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    taken: {
      type: [String],
      default: [],
    },
  },
  { _id: false },
);

export const filmSchema = new Schema<IFilm>(
  {
    id: {
      type: String,
      required: true,
    },
    rating: {
      type: Number,
      required: true,
    },
    director: {
      type: String,
      required: true,
    },
    tags: {
      type: [String],
      default: [],
    },
    image: {
      type: String,
      required: true,
    },
    cover: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    about: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    schedule: {
      type: [scheduleSchema],
      default: [],
    },
  },
  {
    versionKey: false,
    timestamps: false,
  },
);
