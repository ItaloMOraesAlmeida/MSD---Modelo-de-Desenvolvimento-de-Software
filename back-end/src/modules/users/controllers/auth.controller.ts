import { Controller, Post, Body, HttpCode, HttpStatus } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { RegisterUserUseCase } from '../use-cases/registerUser.useCase';
import { LoginUserUseCase } from '../use-cases/loginUser.useCase';
import { CreateUserDto } from '../dtos/createUser.dto';
import { LoginUserDto, LoginResponseDataDto } from '../dtos/loginUser.dto';
import {
  PostResponseDto,
  BaseResponseDto,
} from '../../../shared/dtos/response.dto';

@ApiTags('Autenticação')
@Controller('auth')
export class AuthController {
  constructor(
    private registerUserUseCase: RegisterUserUseCase,
    private loginUserUseCase: LoginUserUseCase,
  ) {}

  @Post('register')
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Cadastrar novo usuário' })
  @ApiResponse({
    status: 201,
    description: 'Usuário cadastrado com sucesso',
    type: PostResponseDto,
  })
  @ApiResponse({
    status: 400,
    description: 'Dados inválidos',
  })
  @ApiResponse({
    status: 409,
    description: 'Email já cadastrado',
  })
  async register(
    @Body() createUserDto: CreateUserDto,
  ): Promise<PostResponseDto> {
    return await this.registerUserUseCase.execute(createUserDto);
  }

  @Post('login')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Realizar login' })
  @ApiResponse({
    status: 200,
    description: 'Login realizado com sucesso',
  })
  @ApiResponse({
    status: 400,
    description: 'Dados inválidos',
  })
  @ApiResponse({
    status: 401,
    description: 'Email ou senha inválidos',
  })
  async login(
    @Body() loginUserDto: LoginUserDto,
  ): Promise<BaseResponseDto<LoginResponseDataDto>> {
    return await this.loginUserUseCase.execute(loginUserDto);
  }
}
