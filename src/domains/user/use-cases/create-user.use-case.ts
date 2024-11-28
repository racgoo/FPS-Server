import { Injectable } from '@nestjs/common';
import { CreateUserPort } from '../ports/driving/create-user.port';
import { User } from '../model/entity/user.entity';
import { UserService } from '../services/user.service';
import { DuplicateUserException } from '../exceptions/duplicate-user.exception';
import { FailedToCreateUserException } from '../exceptions/fail-to-create-user.exception';
import { Transactional } from 'typeorm-transactional';

@Injectable()
export class CreateUserUseCase implements CreateUserPort {
  constructor(private readonly userService: UserService) {}

  @Transactional()
  async execute(
    userData: Omit<User, 'id' | 'createdAt' | 'updatedAt'>,
  ): Promise<User> {
    const existingUser = await this.userService.findByEmail(userData.email);
    if (existingUser) throw new DuplicateUserException();
    try {
      const newUser = this.userService.create(userData);
      await this.userService.save(newUser);
      return newUser;
    } catch {
      throw new FailedToCreateUserException();
    }
  }
}
