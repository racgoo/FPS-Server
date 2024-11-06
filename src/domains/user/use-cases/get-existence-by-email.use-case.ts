import { Injectable } from '@nestjs/common';
import { UserService } from '../services/user.service';
import { GetExistenceByEmailPort } from '../ports/driving/get-existence-by-email.port';
import { NotFoundUserException } from '../exceptions/not-found-user.exception';

@Injectable()
export class GetExistenceByEmailUseCase implements GetExistenceByEmailPort {
  constructor(private readonly userService: UserService) {}

  async execute(email: string): Promise<boolean> {
    try {
      const user = await this.userService.findByEmail(email);
      if (!!user) return true;
      return false;
    } catch {
      throw new NotFoundUserException();
    }
  }
}
