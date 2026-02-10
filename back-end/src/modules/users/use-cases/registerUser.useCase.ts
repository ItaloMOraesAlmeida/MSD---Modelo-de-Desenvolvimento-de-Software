import {
  Injectable,
  ConflictException,
  BadRequestException,
  Inject,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { PrismaUserRepository } from '../repositories/prismaUser.repository';
import { CreateUserDto } from '../dtos/createUser.dto';
import { createUserSchema } from '../validators/user.validator';
import { PostResponseDto } from '../../../shared/dtos/response.dto';

@Injectable()
export class RegisterUserUseCase {
  constructor(
    @Inject('IUserRepository')
    private readonly userRepository: PrismaUserRepository,
  ) {}

  async execute(data: CreateUserDto): Promise<PostResponseDto> {
    try {
      const validatedData = createUserSchema.parse(data);

      const existingUser = await this.userRepository.findByEmail(
        validatedData.email,
      );
      if (existingUser) {
        throw new ConflictException('Email já cadastrado');
      }

      const hashedPassword = await bcrypt.hash(validatedData.password, 10);

      await this.userRepository.create({
        name: validatedData.name,
        email: validatedData.email,
        password: hashedPassword,
      });

      return {
        data: true,
        message: {
          code: 201,
          type: 'success',
          text: 'Usuário cadastrado com sucesso',
          exceptionMessage: '',
        },
      };
    } catch (error) {
      if (error instanceof ConflictException) {
        throw error;
      }

      const errorMessage =
        error instanceof Error ? error.message : 'Erro desconhecido';

      throw new BadRequestException({
        data: false,
        message: {
          code: 400,
          type: 'error',
          text: 'Erro ao cadastrar usuário',
          exceptionMessage: errorMessage,
        },
      });
    }
  }
}
