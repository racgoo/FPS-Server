import { User } from '../../models/user.model';

export interface GetUserByEmailPort {
  execute(email: string): Promise<User>;
}
