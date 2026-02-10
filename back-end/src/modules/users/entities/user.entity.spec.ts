import { UserEntity } from './user.entity';

describe('UserEntity', () => {
  it('deve ser possível instanciar a entidade e definir suas propriedades', () => {
    // Instanciamos a classe
    const user = new UserEntity();

    // Definimos valores para todas as propriedades para garantir cobertura total
    const testData: UserEntity = {
      id: 'uuid-123',
      name: 'Ítalo Almeida',
      email: 'italo@example.com',
      password: 'hashed_password',
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    // Aplicamos os valores à instância
    Object.assign(user, testData);

    // Verificações
    expect(user).toBeDefined();
    expect(user instanceof UserEntity).toBe(true);
    expect(user.id).toBe(testData.id);
    expect(user.name).toBe(testData.name);
    expect(user.email).toBe(testData.email);
    expect(user.password).toBe(testData.password);
    expect(user.createdAt).toBe(testData.createdAt);
    expect(user.updatedAt).toBe(testData.updatedAt);
  });

  it('deve garantir que o construtor da classe funcione corretamente', () => {
    const user = new UserEntity();
    expect(user).toBeInstanceOf(UserEntity);
  });
});
