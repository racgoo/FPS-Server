import { Injectable } from '@nestjs/common';
import { UserService } from '../services/user.service';
import { DeleteUserPort } from '../ports/driving/delete-user.port';
import { FailedToDeleteUserException } from '../exceptions/fail-to-delete-user.exception';

@Injectable()
export class DeleteUserUseCase implements DeleteUserPort {
  constructor(private readonly userService: UserService) {}

  async execute(id: number) {
    try {
      await this.userService.delete(id);
    } catch {
      throw new FailedToDeleteUserException();
    }
  }
}
