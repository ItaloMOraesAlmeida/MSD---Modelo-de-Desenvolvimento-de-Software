import { Module } from '@nestjs/common';
import { UsersModule } from './modules/users/users.module';
import { HealthController } from './shared/controllers/health.controller';
import { PrismaService } from './shared/services/prisma.service';

@Module({
  imports: [UsersModule],
  controllers: [HealthController],
  providers: [PrismaService],
})
export class AppModule {}
