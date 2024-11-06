import { Injectable } from '@nestjs/common';
import { CreateUserPort } from '../ports/driving/create-user.port';
import { User } from '../models/user.model';
import { UserService } from '../services/user.service';
import { DuplicateUserException } from '../exceptions/duplicate-user.exception';
import { FailedToCreateUserException } from '../exceptions/fail-to-create-user.exception';

@Injectable()
export class CreateUserUseCase implements CreateUserPort {
  constructor(private readonly userService: UserService) {}

  async execute(
    userData: Omit<User, 'id' | 'createdAt' | 'updatedAt'>,
  ): Promise<User> {
    const existingUser = await this.userService.findByEmail(userData.email);
    if (existingUser) throw new DuplicateUserException();
    try {
      return await this.userService.create(userData);
    } catch {
      throw new FailedToCreateUserException();
    }
  }
}
