import { User } from 'src/domains/user/models/user.model';
import { TokenType } from './auth.constant';

export interface TokenData {
  payload: Pick<User, 'id' | 'type'>;
  tokenType: TokenType;
  iat?: number;
  exp?: number;
}
