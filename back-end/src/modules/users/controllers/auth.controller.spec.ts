import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { RegisterUserUseCase } from '../use-cases/registerUser.useCase';
import { LoginUserUseCase } from '../use-cases/loginUser.useCase';
import { CreateUserDto } from '../dtos/createUser.dto';
import { LoginUserDto, LoginResponseDataDto } from '../dtos/loginUser.dto';
import {
  PostResponseDto,
  BaseResponseDto,
} from '../../../shared/dtos/response.dto';

describe('AuthController', () => {
  let controller: AuthController;

  // 1. Definimos os mocks fora para que o expect possa acessá-los com segurança
  const mockRegisterUseCase = {
    execute: jest.fn(),
  };

  const mockLoginUseCase = {
    execute: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        {
          provide: RegisterUserUseCase,
          useValue: mockRegisterUseCase,
        },
        {
          provide: LoginUserUseCase,
          useValue: mockLoginUseCase,
        },
      ],
    }).compile();

    controller = module.get<AuthController>(AuthController);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('deve estar definido', () => {
    expect(controller).toBeDefined();
  });

  describe('register', () => {
    it('deve chamar o RegisterUserUseCase com os dados corretos', async () => {
      const dto: CreateUserDto = {
        name: 'João Silva',
        email: 'joao@example.com',
        password: 'password123',
      };

      const mockResponse: PostResponseDto = {
        data: true,
        message: {
          code: 201,
          type: 'success',
          text: 'Usuário cadastrado com sucesso',
          exceptionMessage: '',
        },
      };

      mockRegisterUseCase.execute.mockResolvedValue(mockResponse);

      const result = await controller.register(dto);

      // CORREÇÃO AQUI: Referenciamos o mock diretamente para evitar o erro de unbound-method
      expect(mockRegisterUseCase.execute).toHaveBeenCalledWith(dto);
      expect(result).toEqual(mockResponse);
    });
  });

  describe('login', () => {
    it('deve chamar o LoginUserUseCase com os dados corretos', async () => {
      const dto: LoginUserDto = {
        email: 'joao@example.com',
        password: 'password123',
      };

      const mockResponse: BaseResponseDto<LoginResponseDataDto> = {
        data: { token: 'fake-token' },
        message: {
          code: 200,
          type: 'success',
          text: 'Login realizado com sucesso',
          exceptionMessage: '',
        },
      };

      mockLoginUseCase.execute.mockResolvedValue(mockResponse);

      const result = await controller.login(dto);

      // CORREÇÃO AQUI: Referenciamos o mock diretamente
      expect(mockLoginUseCase.execute).toHaveBeenCalledWith(dto);
      expect(result).toEqual(mockResponse);
    });
  });
});
