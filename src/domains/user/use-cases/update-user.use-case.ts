import { Injectable } from '@nestjs/common';
import { UpdateUserPort } from '../ports/driving/update-user.port';
import { UserService } from '../services/user.service';
import { User } from '../models/user.model';
import { FailedToUpdateUserException } from '../exceptions/fail-to-update.exception';

@Injectable()
export class UpdateUserUseCase implements UpdateUserPort {
  constructor(private readonly userService: UserService) {}

  async execute(id: number, userData: Partial<User>): Promise<User> {
    try {
      return await this.userService.update(id, userData);
    } catch {
      throw new FailedToUpdateUserException();
    }
  }
}
