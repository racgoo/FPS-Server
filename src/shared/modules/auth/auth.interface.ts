import { User } from 'src/domains/user/model/entity/user.entity';
import { TokenType } from './auth.constant';

export interface TokenData {
  payload: Pick<User, 'id' | 'type'>;
  tokenType: TokenType;
  iat?: number;
  exp?: number;
}
