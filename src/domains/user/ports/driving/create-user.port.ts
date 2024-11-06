import { User } from '../../models/user.model';

export interface CreateUserPort {
  execute(
    paymentData: Omit<User, 'id' | 'createdAt' | 'updatedAt'>,
  ): Promise<User>;
}
