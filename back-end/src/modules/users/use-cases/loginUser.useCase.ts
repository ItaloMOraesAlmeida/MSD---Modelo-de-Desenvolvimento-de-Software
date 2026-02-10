import {
  Injectable,
  UnauthorizedException,
  BadRequestException,
  Inject,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { PrismaUserRepository } from '../repositories/prismaUser.repository';
import { LoginUserDto, LoginResponseDataDto } from '../dtos/loginUser.dto';
import { loginUserSchema } from '../validators/user.validator';
import { BaseResponseDto } from '../../../shared/dtos/response.dto';

@Injectable()
export class LoginUserUseCase {
  constructor(
    @Inject('IUserRepository')
    private readonly userRepository: PrismaUserRepository,
    private readonly jwtService: JwtService,
  ) {}

  async execute(
    data: LoginUserDto,
  ): Promise<BaseResponseDto<LoginResponseDataDto>> {
    try {
      const validatedData = loginUserSchema.parse(data);

      const user = await this.userRepository.findByEmail(validatedData.email);
      if (!user) {
        throw new UnauthorizedException('Email ou senha inválidos');
      }

      const isPasswordValid = await bcrypt.compare(
        validatedData.password,
        user.password,
      );
      if (!isPasswordValid) {
        throw new UnauthorizedException('Email ou senha inválidos');
      }

      const payload = { sub: user.id, email: user.email };
      const token = await this.jwtService.signAsync(payload);

      return {
        data: {
          token,
        },
        message: {
          code: 200,
          type: 'success',
          text: 'Login realizado com sucesso',
          exceptionMessage: '',
        },
      };
    } catch (error) {
      if (error instanceof UnauthorizedException) {
        throw error;
      }

      const errorMessage =
        error instanceof Error ? error.message : 'Erro desconhecido';

      throw new BadRequestException({
        data: { token: '' },
        message: {
          code: 400,
          type: 'error',
          text: 'Erro ao realizar login',
          exceptionMessage: errorMessage,
        },
      });
    }
  }
}
