import { User } from '../../models/user.model';

export interface GetUserByIdPort {
  execute(id: number): Promise<User>;
}
