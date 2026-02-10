import { Test, TestingModule } from '@nestjs/testing';
import { HealthController } from './health.controller';
import { PrismaService } from '../services/prisma.service';

describe('HealthController', () => {
  let controller: HealthController;
  let prismaService: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [HealthController],
      providers: [
        {
          // Criamos um mock manual para evitar o uso do PrismaClient real
          provide: PrismaService,
          useValue: {
            $queryRaw: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<HealthController>(HealthController);
    // Aqui pegamos a instância que o Nest injetou no controller
    prismaService = module.get<PrismaService>(PrismaService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('deve estar definido', () => {
    expect(controller).toBeDefined();
  });

  describe('check()', () => {
    it('deve retornar status "ok" quando o banco de dados responder corretamente', async () => {
      // Configuramos o mock através da instância injetada
      const querySpy = jest
        .spyOn(prismaService, '$queryRaw')
        .mockResolvedValue([{ 1: 1 }]);

      const result = await controller.check();

      expect(querySpy).toHaveBeenCalled();
      expect(result).toMatchObject({
        status: 'ok',
        database: {
          status: 'connected',
        },
      });
      expect(result.database.responseTime).toBeGreaterThanOrEqual(0);
    });

    it('deve retornar status "degraded" quando o banco de dados falhar', async () => {
      // Simulamos a falha na query
      jest
        .spyOn(prismaService, '$queryRaw')
        .mockRejectedValue(new Error('DB Error'));

      const result = await controller.check();

      expect(result).toMatchObject({
        status: 'degraded',
        database: {
          status: 'disconnected',
          responseTime: 0,
        },
      });
    });

    it('deve refletir o ambiente atual do NODE_ENV', async () => {
      const originalEnv = process.env.NODE_ENV;
      process.env.NODE_ENV = 'production';

      jest.spyOn(prismaService, '$queryRaw').mockResolvedValue([{ 1: 1 }]);

      const result = await controller.check();
      expect(result.environment).toBe('production');

      process.env.NODE_ENV = originalEnv;
    });

    it('deve usar "development" como ambiente padrão quando NODE_ENV estiver ausente', async () => {
      const originalEnv = process.env.NODE_ENV;
      // Usamos delete para garantir que a propriedade não exista
      delete process.env.NODE_ENV;

      // Corrigido: usando prismaService com spyOn em vez do mock inexistente
      jest.spyOn(prismaService, '$queryRaw').mockResolvedValue([{ 1: 1 }]);

      const result = await controller.check();

      expect(result.environment).toBe('development');

      // Restauramos o ambiente original
      process.env.NODE_ENV = originalEnv;
    });
  });
});
