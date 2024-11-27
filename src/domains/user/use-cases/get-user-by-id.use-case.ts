import { Injectable } from '@nestjs/common';
import { GetUserByIdPort } from '../ports/driving/get-user-by-id.port';
import { UserService } from '../services/user.service';
import { User } from '../model/entity/user.entity';
import { NotFoundUserException } from '../exceptions/not-found-user.exception';

@Injectable()
export class GetUserByIdUseCase implements GetUserByIdPort {
  constructor(private readonly userService: UserService) {}

  async execute(id: number): Promise<User> {
    try {
      const user = await this.userService.findById(id);
      if (!user) throw new Error();
      return user;
    } catch {
      throw new NotFoundUserException();
    }
  }
}
