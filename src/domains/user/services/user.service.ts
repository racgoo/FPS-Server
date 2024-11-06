import { Injectable } from '@nestjs/common';
import { User } from '../models/user.model';
import { Repository } from 'typeorm';
import { SqliteUserEntity } from 'src/persistent/sqlite/entities/sqlite-user.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(SqliteUserEntity)
    private readonly userRepository: Repository<SqliteUserEntity>,
  ) {}

  async findById(id: number): Promise<User> {
    return await this.userRepository.findOneBy({ id });
  }

  async findByEmail(email: string): Promise<User | null> {
    return await this.userRepository.findOneBy({ email });
  }

  async create(
    user: Omit<User, 'id' | 'createdAt' | 'updatedAt'>,
  ): Promise<User> {
    return this.userRepository.save(user);
  }

  async update(id: number, user: Partial<User>): Promise<User> {
    await this.userRepository.update(id, user);
    return this.userRepository.findOneBy({ id });
  }

  async delete(id: number): Promise<void> {
    await this.userRepository.delete(id);
  }
}
