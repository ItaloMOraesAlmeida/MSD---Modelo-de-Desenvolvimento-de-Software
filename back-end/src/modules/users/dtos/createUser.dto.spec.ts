import { CreateUserDto } from './createUser.dto';

describe('CreateUserDto', () => {
  it('deve criar uma instância de CreateUserDto com sucesso', () => {
    const dto = new CreateUserDto();
    dto.name = 'João Silva';
    dto.email = 'joao@example.com';
    dto.password = 'senha123';

    expect(dto).toBeDefined();
    expect(dto.name).toBe('João Silva');
    expect(dto.email).toBe('joao@example.com');
    expect(dto.password).toBe('senha123');
  });

  it('deve permitir a atribuição de valores que seguem os critérios de validação', () => {
    const dto: CreateUserDto = {
      name: 'Ítalo',
      email: 'italo@test.com',
      password: 'password123',
    };

    expect(dto.name.length).toBeGreaterThanOrEqual(3);
    expect(dto.password.length).toBeGreaterThanOrEqual(6);
    expect(dto.email).toContain('@');
  });
});
