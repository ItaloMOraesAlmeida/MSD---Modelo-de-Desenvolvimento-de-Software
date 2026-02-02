import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../shared/services/prisma.service';
import { IUserRepository } from './user.repository.interface';
import { UserEntity } from '../entities/user.entity';

@Injectable()
export class PrismaUserRepository implements IUserRepository {
  constructor(private prisma: PrismaService) {}

  async create(data: {
    name: string;
    email: string;
    password: string;
  }): Promise<UserEntity> {
    return await this.prisma.user.create({
      data,
    });
  }

  async findByEmail(email: string): Promise<UserEntity | null> {
    return await this.prisma.user.findUnique({
      where: { email },
    });
  }

  async findById(id: string): Promise<UserEntity | null> {
    return await this.prisma.user.findUnique({
      where: { id },
    });
  }
}
