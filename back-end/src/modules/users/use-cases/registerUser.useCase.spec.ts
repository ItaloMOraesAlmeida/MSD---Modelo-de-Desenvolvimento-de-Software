import { Test, TestingModule } from '@nestjs/testing';
import { RegisterUserUseCase } from './registerUser.useCase';
import { ConflictException, BadRequestException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from '../dtos/createUser.dto';

// 1. Mock do bcrypt no topo do arquivo
jest.mock('bcrypt');

describe('RegisterUserUseCase', () => {
  let useCase: RegisterUserUseCase;

  // Mock do Repositório
  const mockUserRepository = {
    findByEmail: jest.fn(),
    create: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        RegisterUserUseCase,
        {
          provide: 'IUserRepository',
          useValue: mockUserRepository,
        },
      ],
    }).compile();

    useCase = module.get<RegisterUserUseCase>(RegisterUserUseCase);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('deve estar definido', () => {
    expect(useCase).toBeDefined();
  });

  describe('execute()', () => {
    const createUserDto: CreateUserDto = {
      name: 'Ítalo Almeida',
      email: 'italo@example.com',
      password: 'password123',
    };

    it('deve cadastrar um novo usuário com sucesso', async () => {
      // Simula que o e-mail não existe no banco
      mockUserRepository.findByEmail.mockResolvedValue(null);
      mockUserRepository.create.mockResolvedValue({
        id: '1',
        ...createUserDto,
      });

      // Mock do bcrypt.hash para retornar uma senha fake criptografada
      (bcrypt.hash as jest.Mock).mockResolvedValue('hashed_password');

      const result = await useCase.execute(createUserDto);

      expect(result.data).toBe(true);
      expect(result.message.code).toBe(201);
      expect(mockUserRepository.findByEmail).toHaveBeenCalledWith(
        createUserDto.email,
      );
      expect(bcrypt.hash).toHaveBeenCalledWith(createUserDto.password, 10);
      expect(mockUserRepository.create).toHaveBeenCalledWith({
        name: createUserDto.name,
        email: createUserDto.email,
        password: 'hashed_password',
      });
    });

    it('deve lançar ConflictException se o e-mail já estiver cadastrado', async () => {
      // Simula que o usuário já existe
      mockUserRepository.findByEmail.mockResolvedValue({
        id: '1',
        email: 'italo@example.com',
      });

      await expect(useCase.execute(createUserDto)).rejects.toThrow(
        ConflictException,
      );
      expect(mockUserRepository.create).not.toHaveBeenCalled();
    });

    it('deve lançar BadRequestException se a validação do Zod falhar', async () => {
      // Criamos um objeto parcial para simular erro de validação (nome curto)
      const invalidDto: Partial<CreateUserDto> = {
        name: 'Jo',
        email: 'italo@example.com',
        password: '123',
      };

      await expect(
        useCase.execute(invalidDto as CreateUserDto),
      ).rejects.toThrow(BadRequestException);
    });

    it('deve capturar erros genéricos e transformar em BadRequestException', async () => {
      mockUserRepository.findByEmail.mockRejectedValue(
        new Error('Erro de conexão'),
      );

      await expect(useCase.execute(createUserDto)).rejects.toThrow(
        BadRequestException,
      );
    });
  });
});
