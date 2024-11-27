import { Inject, Injectable } from '@nestjs/common';
import { User } from '../model/entity/user.entity';
import {
  UserRepositoryPort,
  UserRepositoryPortSymbol,
} from '../ports/driven/repository/user.repository.port';

@Injectable()
export class UserService {
  constructor(
    @Inject(UserRepositoryPortSymbol)
    private readonly userRepository: UserRepositoryPort,
  ) {}

  create(user: Omit<User, 'id' | 'createdAt' | 'updatedAt'>): User {
    return this.userRepository.create(user);
  }

  async findById(id: number): Promise<User> {
    return await this.userRepository.findById(id);
  }

  async findByEmail(email: string): Promise<User | null> {
    return await this.userRepository.findByEmail(email);
  }

  async save(user: User): Promise<User> {
    return await this.userRepository.save(user);
  }

  async delete(id: number): Promise<void> {
    await this.userRepository.delete(id);
  }
}
