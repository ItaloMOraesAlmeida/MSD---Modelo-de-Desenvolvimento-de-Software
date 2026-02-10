import { Controller, Get } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { PrismaService } from '../services/prisma.service';

@ApiTags('Health Check')
@Controller('health')
export class HealthController {
  constructor(private readonly prisma: PrismaService) {}

  @Get()
  @ApiOperation({ summary: 'Verificar saúde da aplicação' })
  @ApiResponse({
    status: 200,
    description: 'Aplicação está saudável',
    schema: {
      example: {
        status: 'ok',
        timestamp: '2024-02-02T15:22:30.000Z',
        uptime: 123.456,
        environment: 'development',
        database: {
          status: 'connected',
          responseTime: 5,
        },
      },
    },
  })
  @ApiResponse({
    status: 503,
    description: 'Aplicação está com problemas',
  })
  async check() {
    const startTime = Date.now();
    let databaseStatus = 'disconnected';
    let databaseResponseTime = 0;

    try {
      await this.prisma.$queryRaw`SELECT 1`;
      databaseStatus = 'connected';
      databaseResponseTime = Date.now() - startTime;
    } catch {
      databaseStatus = 'disconnected';
    }

    return {
      status: databaseStatus === 'connected' ? 'ok' : 'degraded',
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
      environment: process.env.NODE_ENV || 'development',
      database: {
        status: databaseStatus,
        responseTime: databaseResponseTime,
      },
    };
  }
}
