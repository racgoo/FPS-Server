import { User } from '../../model/entity/user.entity';

export interface GetUserByIdPort {
  execute(id: number): Promise<User>;
}
