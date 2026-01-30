import { Test, TestingModule } from '@nestjs/testing';
import { FilmsController } from './films.controller';
import { FilmsService } from './films.service';

describe('FilmsController', () => {
  let controller: FilmsController;
  let filmsService: {
    findAll: jest.Mock;
    findByIdWithSchedule: jest.Mock;
  };

  beforeEach(async () => {
    filmsService = {
      findAll: jest.fn(),
      findByIdWithSchedule: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [FilmsController],
      providers: [{ provide: FilmsService, useValue: filmsService }],
    }).compile();

    controller = module.get<FilmsController>(FilmsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('getFilms should return total and items', async () => {
    const films = [{ id: '1' }, { id: '2' }];
    filmsService.findAll.mockResolvedValue(films);
    const res = await controller.getFilms();

    expect(filmsService.findAll).toHaveBeenCalledTimes(1);
    expect(res).toEqual({ total: 2, items: films });
  });

  it('getFilmSchedule should return film info, total and items (mongoose)', async () => {
    const schedule = [{ id: 's1' }, { id: 's2' }];
    const filmDoc: any = {
      id: 'f1',
      title: 'Film',
      schedule,
      toObject: jest
        .fn()
        .mockReturnValue({ id: 'f1', title: 'Film', schedule }),
    };
    filmsService.findByIdWithSchedule.mockResolvedValue(filmDoc);
    const res = await controller.getFilmSchedule('f1');

    expect(filmsService.findByIdWithSchedule).toHaveBeenCalledWith('f1');
    expect(res).toEqual({
      id: 'f1',
      title: 'Film',
      schedule,
      total: 2,
      items: schedule,
    });
  });

  it('getFilmSchedule should return film info, total and items (postgres)', async () => {
    const schedule = [{ id: 's1' }];
    const filmObj: any = { id: 'f2', title: 'Film', schedule };
    filmsService.findByIdWithSchedule.mockResolvedValue(filmObj);
    const res = await controller.getFilmSchedule('f2');

    expect(res).toEqual({
      id: 'f2',
      title: 'Film',
      total: 1,
      items: schedule,
    });
  });
});
