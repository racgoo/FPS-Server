import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { TokenData } from '../auth.interface';
import { Reflector } from '@nestjs/core';
import { JwtTokenTypesKey } from 'src/shared/decorators/jwt-token.decorator.guard';
import { ForbiddenException } from '../exceptions/forbidden.exception';
import { EnvService } from '../../env/env.service';
import { TokenType } from '../auth.constant';
import { ExpiredAccessTokenException } from '../exceptions/expired-access-token.exception';
import { ExpiredRefreshTokenException } from '../exceptions/expired-refresh-token.exception';
import * as dayjs from 'dayjs';
import { Request } from 'express';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly reflector: Reflector,
    private readonly envService: EnvService,
  ) {
    const secret = envService.get('JWT_SECRET');
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (request: any) => {
          const headerToken = ExtractJwt.fromAuthHeaderAsBearerToken()(request);
          const cookieToken =
            request.cookies[TokenType.REFRESH_TOKEN] ||
            request.cookies[TokenType.ACCESS_TOKEN];
          return headerToken || cookieToken;
        },
      ]),
      ignoreExpiration: true,
      secretOrKey: secret,
      passReqToCallback: true,
    });
  }

  async validate(request: Request, tokenData: TokenData) {
    this.throwExpiredTokenException(tokenData);
    this.throwInvalidRoleException(request, tokenData);
    return tokenData;
  }

  private throwExpiredTokenException(tokenData: TokenData) {
    const currentTime = dayjs().unix();
    if (tokenData.exp && tokenData.exp < currentTime) {
      switch (tokenData.tokenType) {
        case TokenType.ACCESS_TOKEN:
          throw new ExpiredAccessTokenException();
        case TokenType.REFRESH_TOKEN:
          throw new ExpiredRefreshTokenException();
      }
    }
  }

  private throwInvalidRoleException(request: Request, tokenData: TokenData) {
    const allowedTokenTypes = this.getAllowedTokenTypes(request);
    if (!allowedTokenTypes.includes(tokenData.tokenType)) {
      throw new ForbiddenException();
    }
  }

  private getAllowedTokenTypes(request: Request) {
    const reflectorHandler =
      request.route.stack[request.route.stack.length - 1].handle;
    const allowedTokenTypes = this.reflector.get<TokenType[]>(
      JwtTokenTypesKey,
      reflectorHandler,
    ) || [TokenType.ACCESS_TOKEN];
    return allowedTokenTypes;
  }
}
