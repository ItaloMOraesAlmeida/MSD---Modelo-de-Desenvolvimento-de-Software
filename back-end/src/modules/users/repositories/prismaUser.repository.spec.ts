import { Test, TestingModule } from '@nestjs/testing';
import { PrismaUserRepository } from './prismaUser.repository';
import { PrismaService } from '../../../shared/services/prisma.service';

describe('PrismaUserRepository', () => {
  let repository: PrismaUserRepository;

  // Mock focado apenas no que o repositório consome
  const mockPrismaService = {
    user: {
      create: jest.fn(),
      findUnique: jest.fn(),
    },
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PrismaUserRepository,
        {
          provide: PrismaService,
          useValue: mockPrismaService,
        },
      ],
    }).compile();

    repository = module.get<PrismaUserRepository>(PrismaUserRepository);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  // Teste de instância explícito para forçar o coverage do constructor
  it('deve ser uma instância de PrismaUserRepository', () => {
    expect(repository).toBeDefined();
    expect(repository).toBeInstanceOf(PrismaUserRepository);
  });

  describe('create()', () => {
    it('deve chamar prisma.user.create com os dados corretos', async () => {
      const userData = {
        name: 'Ítalo Almeida',
        email: 'italo@example.com',
        password: 'hashed_password',
      };

      const expectedUser = {
        id: 'uuid-123',
        ...userData,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      mockPrismaService.user.create.mockResolvedValue(expectedUser);

      const result = await repository.create(userData);

      expect(mockPrismaService.user.create).toHaveBeenCalledWith({
        data: userData,
      });
      expect(result).toEqual(expectedUser);
    });
  });

  describe('findByEmail()', () => {
    it('deve chamar prisma.user.findUnique com o filtro de email', async () => {
      const email = 'italo@example.com';
      mockPrismaService.user.findUnique.mockResolvedValue({ id: '1', email });

      const result = await repository.findByEmail(email);

      expect(mockPrismaService.user.findUnique).toHaveBeenCalledWith({
        where: { email },
      });
      expect(result?.email).toBe(email);
    });
  });

  describe('findById()', () => {
    it('deve chamar prisma.user.findUnique com o filtro de ID', async () => {
      const id = 'uuid-123';
      mockPrismaService.user.findUnique.mockResolvedValue({
        id,
        email: 'test@test.com',
      });

      await repository.findById(id);

      // Usamos a sintaxe de colchetes para evitar o aviso de unbound-method se necessário
      expect(mockPrismaService.user['findUnique']).toHaveBeenCalledWith({
        where: { id },
      });
    });
  });
});
