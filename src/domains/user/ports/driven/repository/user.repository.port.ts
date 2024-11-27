import { User } from '@domains/user/model/entity/user.entity';

export const UserRepositoryPortSymbol = Symbol('UserRepositoryPort');

export interface UserRepositoryPort {
  create(user: Omit<User, 'id' | 'createdAt' | 'updatedAt'>): User;
  save(user: User): Promise<User>;
  findById(id: number): Promise<User | null>;
  findByEmail(email: string): Promise<User | null>;
  delete(id: number): Promise<void>;
}
