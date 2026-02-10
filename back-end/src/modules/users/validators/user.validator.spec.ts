import { createUserSchema, loginUserSchema } from './user.validator';

describe('User Validators (Zod)', () => {
  describe('createUserSchema', () => {
    it('deve validar um usuário correto', () => {
      const validUser = {
        name: 'Ítalo Almeida',
        email: 'italo@example.com',
        password: 'password123',
      };

      const result = createUserSchema.safeParse(validUser);
      expect(result.success).toBe(true);
    });

    it('deve falhar se o nome tiver menos de 3 caracteres', () => {
      const invalidUser = {
        name: 'Jo',
        email: 'jo@example.com',
        password: 'password123',
      };

      const result = createUserSchema.safeParse(invalidUser);
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0].message).toBe(
          'Nome deve ter no mínimo 3 caracteres',
        );
      }
    });

    it('deve falhar se o email for inválido', () => {
      const invalidUser = {
        name: 'João Silva',
        email: 'email-invalido',
        password: 'password123',
      };

      const result = createUserSchema.safeParse(invalidUser);
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0].message).toBe('Email inválido');
      }
    });

    it('deve falhar se a senha tiver menos de 6 caracteres', () => {
      const invalidUser = {
        name: 'João Silva',
        email: 'joao@example.com',
        password: '12345',
      };

      const result = createUserSchema.safeParse(invalidUser);
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0].message).toBe(
          'Senha deve ter no mínimo 6 caracteres',
        );
      }
    });
  });

  describe('loginUserSchema', () => {
    it('deve validar um login correto', () => {
      const validLogin = {
        email: 'italo@example.com',
        password: 'password123',
      };

      const result = loginUserSchema.safeParse(validLogin);
      expect(result.success).toBe(true);
    });

    it('deve falhar se a senha estiver vazia', () => {
      const invalidLogin = {
        email: 'italo@example.com',
        password: '',
      };

      const result = loginUserSchema.safeParse(invalidLogin);
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0].message).toBe('Senha é obrigatória');
      }
    });
  });
});
