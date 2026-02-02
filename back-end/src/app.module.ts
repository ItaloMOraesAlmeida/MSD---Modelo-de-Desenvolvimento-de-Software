import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './modules/users/users.module';
import { HealthController } from './shared/controllers/health.controller';
import { PrismaService } from './shared/services/prisma.service';

@Module({
  imports: [UsersModule],
  controllers: [AppController, HealthController],
  providers: [AppService, PrismaService],
})
export class AppModule {}
