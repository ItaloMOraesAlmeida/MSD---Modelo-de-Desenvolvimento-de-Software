import { NestFactory } from '@nestjs/core';
import { SwaggerModule } from '@nestjs/swagger';
import * as main from './main'; // Importação como namespace para garantir acesso à função

jest.mock('@nestjs/core', () => ({
  NestFactory: {
    create: jest.fn(),
  },
}));

jest.mock('@nestjs/swagger', () => {
  const originalModule =
    jest.requireActual<typeof import('@nestjs/swagger')>('@nestjs/swagger');
  return {
    ...originalModule,
    SwaggerModule: {
      createDocument: jest.fn().mockReturnValue({}),
      setup: jest.fn(),
    },
    DocumentBuilder: jest.fn().mockImplementation(() => ({
      setTitle: jest.fn().mockReturnThis(),
      setDescription: jest.fn().mockReturnThis(),
      setVersion: jest.fn().mockReturnThis(),
      addTag: jest.fn().mockReturnThis(),
      addBearerAuth: jest.fn().mockReturnThis(),
      build: jest.fn().mockReturnValue({}),
    })),
  };
});

describe('Main Bootstrap Coverage', () => {
  let mockApp: Record<string, jest.Mock>;

  beforeEach(() => {
    mockApp = {
      enableCors: jest.fn(),
      useGlobalPipes: jest.fn(),
      listen: jest.fn().mockResolvedValue(undefined),
    };
    (NestFactory['create'] as jest.Mock).mockResolvedValue(mockApp);
    jest.spyOn(console, 'log').mockImplementation(() => {});
  });

  it('deve executar o bootstrap por completo para validar a infraestrutura', async () => {
    // Definimos a porta para garantir que o código passe pelo branch do process.env.PORT
    process.env.PORT = '3001';

    await main.bootstrap();

    expect(NestFactory['create']).toHaveBeenCalled();
    expect(mockApp['enableCors']).toHaveBeenCalled();
    expect(mockApp['useGlobalPipes']).toHaveBeenCalled();
    expect(SwaggerModule['setup']).toHaveBeenCalled();
    expect(mockApp['listen']).toHaveBeenCalledWith('3001');
  });
});
