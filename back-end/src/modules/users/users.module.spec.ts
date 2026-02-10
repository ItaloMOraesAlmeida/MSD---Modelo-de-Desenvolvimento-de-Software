import { Test, TestingModule } from '@nestjs/testing';
import { UsersModule } from './users.module';
import { AuthController } from './controllers/auth.controller';
import { RegisterUserUseCase } from './use-cases/registerUser.useCase';
import { LoginUserUseCase } from './use-cases/loginUser.useCase';
import { PrismaUserRepository } from './repositories/prismaUser.repository';
import { PrismaService } from '../../shared/services/prisma.service';
import { JwtService } from '@nestjs/jwt';

describe('UsersModule', () => {
  let module: TestingModule;

  beforeEach(async () => {
    module = await Test.createTestingModule({
      imports: [UsersModule],
    })
      .overrideProvider(PrismaService)
      .useValue({
        $connect: jest.fn(),
        $disconnect: jest.fn(),
      })
      .compile();
  });

  it('deve estar definido', () => {
    expect(module).toBeDefined();
  });

  it('deve prover o AuthController', () => {
    const controller = module.get<AuthController>(AuthController);
    expect(controller).toBeDefined();
  });

  it('deve prover o RegisterUserUseCase', () => {
    const useCase = module.get<RegisterUserUseCase>(RegisterUserUseCase);
    expect(useCase).toBeDefined();
  });

  it('deve prover o LoginUserUseCase', () => {
    const useCase = module.get<LoginUserUseCase>(LoginUserUseCase);
    expect(useCase).toBeDefined();
  });

  it('deve prover o PrismaUserRepository através da classe', () => {
    const repository = module.get<PrismaUserRepository>(PrismaUserRepository);
    expect(repository).toBeDefined();
    expect(repository).toBeInstanceOf(PrismaUserRepository);
  });

  it('deve prover o repositório através do token "IUserRepository"', () => {
    // CORREÇÃO AQUI: Adicionamos o genérico <PrismaUserRepository> para evitar o 'any'
    const repository = module.get<PrismaUserRepository>('IUserRepository');

    expect(repository).toBeDefined();
    expect(repository).toBeInstanceOf(PrismaUserRepository);
  });

  it('deve configurar o JwtService corretamente', () => {
    const jwtService = module.get<JwtService>(JwtService);
    expect(jwtService).toBeDefined();
    expect(jwtService).toHaveProperty('options');
  });
});
