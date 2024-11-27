import { User } from '../../model/entity/user.entity';

export interface GetUserByEmailPort {
  execute(email: string): Promise<User>;
}
