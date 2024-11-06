import { Injectable } from '@nestjs/common';
import { UserService } from '../services/user.service';
import { User } from '../models/user.model';
import { GetUserByEmailPort } from '../ports/driving/get-user-by-email.port';
import { NotFoundUserException } from '../exceptions/not-found-user.exception';

@Injectable()
export class GetUserByEmailUseCase implements GetUserByEmailPort {
  constructor(private readonly userService: UserService) {}

  async execute(email: string): Promise<User> {
    try {
      const user = await this.userService.findByEmail(email);
      if (!user) throw new Error();
      return user;
    } catch {
      throw new NotFoundUserException();
    }
  }
}
