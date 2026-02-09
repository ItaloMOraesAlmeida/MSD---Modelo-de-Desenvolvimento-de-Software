# Dockerfile para Back-End NestJS
# Multi-stage build para otimizar o tamanho da imagem

# Estágio 1: Build
FROM node:20-alpine AS builder

# Definir diretório de trabalho
WORKDIR /app

# Copiar arquivos de dependências
COPY back-end/package*.json ./
COPY back-end/tsconfig*.json ./
COPY back-end/nest-cli.json ./

# Copiar configuração do Prisma
COPY back-end/prisma ./prisma/
COPY back-end/prisma.config.ts ./

# Instalar dependências (incluindo dev dependencies para build)
RUN npm ci

# Copiar código fonte
COPY back-end/src ./src/

# Gerar Prisma Client
RUN npx prisma generate

# Build da aplicação
RUN npm run build

# Remover dev dependencies
RUN npm prune --production

# Estágio 2: Produção
FROM node:20-alpine AS production

# Instalar apenas dependências necessárias
RUN apk add --no-cache dumb-init

# Criar usuário não-root para segurança
RUN addgroup -g 1001 -S nodejs && adduser -S nestjs -u 1001

# Definir diretório de trabalho
WORKDIR /app

# Copiar apenas arquivos necessários do estágio de build
COPY --from=builder --chown=nestjs:nodejs /app/node_modules ./node_modules
COPY --from=builder --chown=nestjs:nodejs /app/dist ./dist
COPY --from=builder --chown=nestjs:nodejs /app/prisma ./prisma
COPY --from=builder --chown=nestjs:nodejs /app/generated ./generated
COPY --from=builder --chown=nestjs:nodejs /app/prisma.config.ts ./
COPY --from=builder --chown=nestjs:nodejs /app/package*.json ./

# Mudar para usuário não-root
USER nestjs

# Expor porta da aplicação
EXPOSE 4000

# Variáveis de ambiente padrão
ENV NODE_ENV=production
ENV PORT=4000

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=40s --retries=3 \
  CMD node -e "require('http').get('http://localhost:4000/health', (r) => {process.exit(r.statusCode === 200 ? 0 : 1)})"

# Usar dumb-init para lidar com sinais corretamente
ENTRYPOINT ["dumb-init", "--"]

# Comando para iniciar a aplicação
CMD ["node", "dist/main.js"]
