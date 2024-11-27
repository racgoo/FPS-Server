import { User } from '../../model/entity/user.entity';

export interface CreateUserPort {
  execute(
    paymentData: Omit<User, 'id' | 'createdAt' | 'updatedAt'>,
  ): Promise<User>;
}
