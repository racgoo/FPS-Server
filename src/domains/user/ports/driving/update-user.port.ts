import { User } from '../../models/user.model';

export interface UpdateUserPort {
  execute(id: number, userData: Partial<User>): Promise<User>;
}
