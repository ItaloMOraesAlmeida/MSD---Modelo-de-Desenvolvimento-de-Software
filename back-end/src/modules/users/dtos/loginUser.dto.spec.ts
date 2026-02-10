import { LoginUserDto, LoginResponseDataDto } from './loginUser.dto';

describe('LoginUser DTOs', () => {
  describe('LoginUserDto', () => {
    it('deve criar uma instância de LoginUserDto com sucesso', () => {
      const dto = new LoginUserDto();
      dto.email = 'joao@example.com';
      dto.password = 'senha123';

      expect(dto).toBeDefined();
      expect(dto.email).toBe('joao@example.com');
      expect(dto.password).toBe('senha123');
    });

    it('deve validar se as propriedades básicas estão presentes', () => {
      const dto: LoginUserDto = {
        email: 'teste@exemplo.com',
        password: 'any_password',
      };

      expect(dto.email).toBeDefined();
      expect(dto.password).toBeDefined();
      expect(dto.password.length).toBeGreaterThanOrEqual(1);
    });
  });

  describe('LoginResponseDataDto', () => {
    it('deve conter o campo token na resposta de sucesso', () => {
      const dto = new LoginResponseDataDto();
      dto.token = 'fake-jwt-token';

      expect(dto).toBeDefined();
      expect(dto.token).toBe('fake-jwt-token');
    });
  });
});
