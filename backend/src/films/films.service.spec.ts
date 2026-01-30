import { Test, TestingModule } from '@nestjs/testing';
import { FilmsService } from './films.service';
import { FILMS_REPO } from '../repository/films.repository';

describe('FilmsService', () => {
  let service: FilmsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FilmsService,
        {
          provide: FILMS_REPO,
          useValue: {
            findAll: jest.fn(),
            findByIdWithSchedule: jest.fn(),
            takeSeat: jest.fn(),
          }
        }
      ],
    }).compile();

    service = module.get<FilmsService>(FilmsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
