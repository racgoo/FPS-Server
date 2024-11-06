import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { TokenData } from '../auth.interface';
import { Reflector } from '@nestjs/core';
import { JwtTokenTypesKey } from 'src/shared/decorators/jwt-token.decorator.guard';
import { ForbiddenException } from '../exceptions/forbidden.exception';
import { EnvService } from '../../env/env.service';
import { TokenType } from '../auth.constant';

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
          return (
            ExtractJwt.fromAuthHeaderAsBearerToken()(request) ||
            request.cookies[TokenType.REFRESH_TOKEN] ||
            request.cookies[TokenType.ACCESS_TOKEN]
          );
        },
      ]),
      ignoreExpiration: false,
      secretOrKey: secret,
      passReqToCallback: true,
    });
  }

  async validate(request: any, tokenData: TokenData) {
    const handler = request.route.stack[request.route.stack.length - 1].handle;
    const allowedTokenTypes = this.reflector.get<TokenType[]>(
      JwtTokenTypesKey,
      handler,
    ) || [TokenType.ACCESS_TOKEN];
    if (!allowedTokenTypes.includes(tokenData.tokenType)) {
      throw new ForbiddenException();
    }
    return tokenData;
  }
}
