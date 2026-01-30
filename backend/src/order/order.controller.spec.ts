import { Test, TestingModule } from '@nestjs/testing';
import { OrderController } from './order.controller';
import { OrderService } from './order.service';

describe('OrderController', () => {
  let controller: OrderController;
  let orderService: { create: jest.Mock };

  beforeEach(async () => {
    orderService = {
      create: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [OrderController],
      providers: [{ provide: OrderService, useValue: orderService }],
    }).compile();

    controller = module.get<OrderController>(OrderController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('createOrder should call OrderService.create(dto) and return result', async () => {
    const dto: any = {
      email: 'example@mail.com',
      phone: '+77777777777',
      tickets: [],
    };
    const result = { total: 0, items: [] };
    orderService.create.mockResolvedValue(result);
    const res = await controller.createOrder(dto);

    expect(orderService.create).toHaveBeenCalledTimes(1);
    expect(orderService.create).toHaveBeenCalledWith(dto);
    expect(res).toBe(result);
  });
});
