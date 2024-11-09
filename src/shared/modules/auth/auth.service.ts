import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { instanceToPlain } from 'class-transformer';
import { TokenData } from './auth.interface';
import { TokenExpireTime, TokenType } from './auth.constant';

@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService) {}

  async generateToken(tokenData: TokenData) {
    const plain = instanceToPlain(tokenData);
    switch (tokenData.tokenType) {
      case TokenType.ACCESS_TOKEN:
        return this.jwtService.sign(plain, {
          expiresIn: TokenExpireTime.ACCESS_TOKEN,
        });
      case TokenType.REFRESH_TOKEN:
        return this.jwtService.sign(plain, {
          expiresIn: TokenExpireTime.REFRESH_TOKEN,
        });
    }
  }

  verifyToken(token: string) {
    return this.jwtService.verify(token);
  }
}
