import {
  Injectable,
  OnModuleInit,
  OnModuleDestroy,
  Logger,
} from '@nestjs/common';
import { PrismaClient } from '../../../generated/prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import { Pool } from 'pg';

@Injectable()
export class PrismaService
  extends PrismaClient
  implements OnModuleInit, OnModuleDestroy
{
  private readonly logger = new Logger(PrismaService.name);

  constructor() {
    const connectionString = process.env.DATABASE_URL;
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call
    const pool = new Pool({ connectionString });
    const adapter = new PrismaPg(pool);

    super({ adapter });
  }

  async onModuleInit() {
    await this.connectWithRetry();
  }

  async onModuleDestroy() {
    await this.$disconnect();
  }

  private async connectWithRetry(
    maxRetries = 5,
    initialDelay = 2000,
  ): Promise<void> {
    let retries = 0;
    let delay = initialDelay;

    this.logger.log('🔍 Verificando conexão com o banco de dados...');

    while (retries < maxRetries) {
      try {
        await this.$connect();
        await this.$queryRaw`SELECT 1`;
        this.logger.log('✅ Banco de dados conectado com sucesso!');
        return;
      } catch (error) {
        retries++;
        if (retries >= maxRetries) {
          const errorMessage =
            error instanceof Error ? error.message : 'Erro desconhecido';
          this.logger.error(
            `❌ Falha ao conectar ao banco de dados após ${maxRetries} tentativas`,
          );
          this.logger.error(`Erro: ${errorMessage}`);
          throw new Error(
            `Não foi possível conectar ao banco de dados. Verifique se o PostgreSQL está rodando e as credenciais estão corretas. Detalhes: ${errorMessage}`,
          );
        }

        this.logger.warn(
          `⚠️  Tentativa ${retries}/${maxRetries} falhou. Tentando novamente em ${delay}ms...`,
        );
        await new Promise((resolve) => setTimeout(resolve, delay));
        delay *= 2; // Backoff exponencial
      }
    }
  }
}
