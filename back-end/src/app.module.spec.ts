import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from './app.module';
import { HealthController } from './shared/controllers/health.controller';
import { PrismaService } from './shared/services/prisma.service';

describe('AppModule', () => {
  let module: TestingModule;

  beforeEach(async () => {
    module = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();
  });

  it('deve estar definido', () => {
    const appModule = module.get<AppModule>(AppModule);
    expect(appModule).toBeDefined();
  });

  it('deve conter o HealthController', () => {
    const controller = module.get<HealthController>(HealthController);
    expect(controller).toBeDefined();
    expect(controller).toBeInstanceOf(HealthController);
  });

  it('deve conter o PrismaService', () => {
    const service = module.get<PrismaService>(PrismaService);

    expect(service).toBeDefined();
    expect(typeof service).toBe('object');
  });
});
