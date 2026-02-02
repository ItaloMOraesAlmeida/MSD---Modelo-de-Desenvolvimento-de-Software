import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Habilita CORS
  app.enableCors();

  // Habilita validação global
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  // Configuração do Swagger
  const config = new DocumentBuilder()
    .setTitle('API de Gestão de Usuários')
    .setDescription(
      `API completa para cadastro e autenticação de usuários.
      
## Funcionalidades

### Autenticação
- **POST /auth/register**: Cadastro de novo usuário
- **POST /auth/login**: Login de usuário e geração de token JWT

## Estrutura de Resposta

Todas as respostas seguem um padrão consistente:

### GET (Lista)
\`\`\`json
{
  "data": {},
  "pagination": {
    "total": 100,
    "perPage": 10,
    "currentPage": 1,
    "totalPages": 10
  },
  "ordernation": {
    "direction": "asc",
    "orderBy": "createdAt"
  },
  "message": {
    "code": 200,
    "type": "success",
    "text": "Operação realizada com sucesso",
    "exceptionMessage": ""
  }
}
\`\`\`

### POST/PUT/DELETE
\`\`\`json
{
  "data": true,
  "message": {
    "code": 201,
    "type": "success",
    "text": "Operação realizada com sucesso",
    "exceptionMessage": ""
  }
}
\`\`\`

### POST /auth/login (Exceção)
\`\`\`json
{
  "data": {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  },
  "message": {
    "code": 200,
    "type": "success",
    "text": "Login realizado com sucesso",
    "exceptionMessage": ""
  }
}
\`\`\`

## Autenticação JWT

Após o login, utilize o token JWT retornado no header das requisições:
\`\`\`
Authorization: Bearer {token}
\`\`\`

## Validações

Todos os dados são validados usando Zod:
- **Nome**: Mínimo 3 caracteres
- **Email**: Formato válido de email
- **Senha**: Mínimo 6 caracteres
      `,
    )
    .setVersion('1.0')
    .addTag('Autenticação', 'Endpoints para cadastro e login de usuários')
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        name: 'JWT',
        description: 'Insira o token JWT',
        in: 'header',
      },
      'JWT-auth',
    )
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document, {
    customSiteTitle: 'API Documentation',
    customfavIcon: 'https://nestjs.com/img/logo_text.svg',
    customJs: [
      'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.15.5/swagger-ui-bundle.min.js',
      'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.15.5/swagger-ui-standalone-preset.min.js',
    ],
    customCssUrl: [
      'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.15.5/swagger-ui.min.css',
      'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.15.5/swagger-ui-standalone-preset.min.css',
    ],
  });

  const port = process.env.PORT ?? 3000;
  await app.listen(port);

  console.log(`\n🚀 Servidor rodando na porta ${port}`);
  console.log(`📚 Documentação Swagger: http://localhost:${port}/api/docs\n`);
}
void bootstrap();
