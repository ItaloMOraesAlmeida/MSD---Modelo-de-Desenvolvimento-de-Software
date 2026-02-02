import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthController } from './controllers/auth.controller';
import { RegisterUserUseCase } from './use-cases/registerUser.useCase';
import { LoginUserUseCase } from './use-cases/loginUser.useCase';
import { PrismaUserRepository } from './repositories/prismaUser.repository';
import { PrismaService } from '../../shared/services/prisma.service';

@Module({
  imports: [
    ConfigModule.forRoot(),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => {
        return {
          secret:
            configService.get<string>('JWT_SECRET') ||
            'your-secret-key-change-in-production',
          signOptions: {
            expiresIn: configService.get('JWT_EXPIRES_IN') || '7d',
          },
        };
      },
      inject: [ConfigService],
    }),
  ],
  controllers: [AuthController],
  providers: [
    PrismaService,
    RegisterUserUseCase,
    LoginUserUseCase,
    {
      provide: 'IUserRepository',
      useClass: PrismaUserRepository,
    },
    {
      provide: PrismaUserRepository,
      useFactory: (prisma: PrismaService) => {
        return new PrismaUserRepository(prisma);
      },
      inject: [PrismaService],
    },
  ],
})
export class UsersModule {}
