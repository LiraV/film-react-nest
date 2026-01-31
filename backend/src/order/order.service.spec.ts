import { Test, TestingModule } from '@nestjs/testing';
import { OrderService } from './order.service';
import { getModelToken } from '@nestjs/mongoose';
import { FilmsService } from '../films/films.service';

describe('OrderService', () => {
  let service: OrderService;

  const orderModelMock = {
    create: jest.fn(),
  };

  const filmsServiceMock = {
    findByIdWithSchedule: jest.fn(),
    takeSeat: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        OrderService,
        { provide: getModelToken('Order'), useValue: orderModelMock },
        { provide: FilmsService, useValue: filmsServiceMock },
      ],
    }).compile();

    service = module.get<OrderService>(OrderService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
