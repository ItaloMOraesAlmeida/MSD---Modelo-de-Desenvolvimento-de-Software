import { UserEntity } from '../entities/user.entity';

export interface IUserRepository {
  create(data: {
    name: string;
    email: string;
    password: string;
  }): Promise<UserEntity>;
  findByEmail(email: string): Promise<UserEntity | null>;
  findById(id: string): Promise<UserEntity | null>;
}
