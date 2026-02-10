import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from './prisma.service';
import { Logger } from '@nestjs/common';

// 1. Mock do módulo 'pg'
jest.mock('pg', () => ({
  Pool: jest.fn().mockImplementation(() => ({
    on: jest.fn(),
    connect: jest.fn(),
    end: jest.fn(),
  })),
}));

// 2. Mock do adaptador Prisma
jest.mock('@prisma/adapter-pg', () => ({
  PrismaPg: jest.fn().mockImplementation(() => ({
    provider: 'postgres',
    adapterName: 'pg',
  })),
}));

describe('PrismaService', () => {
  let service: PrismaService;

  beforeEach(async () => {
    // Silencia o Logger para não sujar o terminal de testes
    jest.spyOn(Logger.prototype, 'log').mockImplementation(() => {});
    jest.spyOn(Logger.prototype, 'error').mockImplementation(() => {});
    jest.spyOn(Logger.prototype, 'warn').mockImplementation(() => {});

    process.env.DATABASE_URL = 'postgresql://user:pass@localhost:5432/db';

    const module: TestingModule = await Test.createTestingModule({
      providers: [PrismaService],
    }).compile();

    service = module.get<PrismaService>(PrismaService);

    // Mocks dos métodos base
    jest.spyOn(service, '$connect').mockResolvedValue(undefined);
    jest.spyOn(service, '$disconnect').mockResolvedValue(undefined);
    jest.spyOn(service, '$queryRaw').mockResolvedValue([{ 1: 1 }]);
  });

  afterEach(() => {
    jest.clearAllMocks();
    jest.useRealTimers();
  });

  it('deve estar definido', () => {
    expect(service).toBeDefined();
  });

  describe('onModuleInit', () => {
    it('deve conectar ao banco com sucesso na primeira tentativa', async () => {
      const connectSpy = jest.spyOn(service, '$connect');
      await service.onModuleInit();
      expect(connectSpy).toHaveBeenCalledTimes(1);
    });
  });

  describe('connectWithRetry', () => {
    it('deve lançar erro após exceder o número máximo de tentativas', async () => {
      // Força falha no $connect
      jest
        .spyOn(service, '$connect')
        .mockRejectedValue(new Error('Banco offline'));

      jest.useFakeTimers();

      // Iniciamos a chamada
      const connectPromise = service.onModuleInit();

      // Avançamos os timers repetidamente para cobrir os retries
      // Usamos um loop simples para garantir que o backoff seja processado
      for (let i = 0; i < 10; i++) {
        jest.advanceTimersByTime(10000);
        // Resolve promessas pendentes em cada ciclo
        await Promise.resolve();
      }

      // Verificamos se a promessa final rejeitou com a mensagem esperada
      await expect(connectPromise).rejects.toThrow(
        /Não foi possível conectar ao banco de dados/,
      );

      jest.useRealTimers();
    });
  });

  describe('onModuleDestroy', () => {
    it('deve chamar o $disconnect ao destruir o módulo', async () => {
      const disconnectSpy = jest.spyOn(service, '$disconnect');
      await service.onModuleDestroy();
      expect(disconnectSpy).toHaveBeenCalledTimes(1);
    });
  });
});
