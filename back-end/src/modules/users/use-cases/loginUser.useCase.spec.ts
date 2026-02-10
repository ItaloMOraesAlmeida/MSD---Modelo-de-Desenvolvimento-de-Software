import { Test, TestingModule } from '@nestjs/testing';
import { LoginUserUseCase } from './loginUser.useCase';
import { JwtService } from '@nestjs/jwt';
import { UnauthorizedException, BadRequestException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { LoginUserDto } from '../dtos/loginUser.dto';

// 1. Mock do bcrypt no topo do arquivo
jest.mock('bcrypt');

describe('LoginUserUseCase', () => {
  let useCase: LoginUserUseCase;

  // Mock do Repositório - Definimos o tipo para ajudar o TS
  const mockUserRepository = {
    findByEmail: jest.fn(),
  };

  // Mock do JwtService
  const mockJwtService = {
    signAsync: jest.fn().mockResolvedValue('fake-jwt-token'),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        LoginUserUseCase,
        {
          provide: 'IUserRepository',
          useValue: mockUserRepository,
        },
        {
          provide: JwtService,
          useValue: mockJwtService,
        },
      ],
    }).compile();

    useCase = module.get<LoginUserUseCase>(LoginUserUseCase);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('deve estar definido', () => {
    expect(useCase).toBeDefined();
  });

  describe('execute()', () => {
    const loginDto: LoginUserDto = {
      email: 'teste@exemplo.com',
      password: 'password123',
    };

    it('deve realizar login com sucesso e retornar um token', async () => {
      const mockUser = {
        id: '1',
        email: 'teste@exemplo.com',
        password: 'hashed_password',
      };

      mockUserRepository.findByEmail.mockResolvedValue(mockUser);
      (bcrypt.compare as jest.Mock).mockResolvedValue(true);

      const result = await useCase.execute(loginDto);

      expect(result.data.token).toBe('fake-jwt-token');
      expect(result.message.type).toBe('success');
      expect(mockUserRepository.findByEmail).toHaveBeenCalledWith(
        loginDto.email,
      );
      expect(mockJwtService.signAsync).toHaveBeenCalled();
    });

    it('deve lançar UnauthorizedException se o e-mail não for encontrado', async () => {
      mockUserRepository.findByEmail.mockResolvedValue(null);

      await expect(useCase.execute(loginDto)).rejects.toThrow(
        UnauthorizedException,
      );
    });

    it('deve lançar UnauthorizedException se a senha estiver incorreta', async () => {
      const mockUser = {
        id: '1',
        email: 'teste@exemplo.com',
        password: 'hashed_password',
      };

      mockUserRepository.findByEmail.mockResolvedValue(mockUser);
      (bcrypt.compare as jest.Mock).mockResolvedValue(false);

      await expect(useCase.execute(loginDto)).rejects.toThrow(
        UnauthorizedException,
      );
    });

    it('deve lançar BadRequestException se a validação do Zod falhar', async () => {
      // Usamos Partial para evitar o 'any' e simular dados incompletos
      const invalidDto: Partial<LoginUserDto> = {
        email: 'email-invalido',
      };

      await expect(useCase.execute(invalidDto as LoginUserDto)).rejects.toThrow(
        BadRequestException,
      );
    });
  });
});
