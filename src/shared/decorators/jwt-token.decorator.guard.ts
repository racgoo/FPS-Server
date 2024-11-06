import { SetMetadata } from '@nestjs/common';
import { TokenType } from '../modules/auth/auth.constant';

export const JwtTokenTypesKey = 'jwtTokenTypesKey';
export const JwtTokenTypes = (...types: TokenType[]) =>
  SetMetadata(JwtTokenTypesKey, types);
