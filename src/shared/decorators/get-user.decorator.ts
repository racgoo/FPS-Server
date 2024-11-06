import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { TokenData } from '../modules/auth/auth.interface';

export const GetTokenData = createParamDecorator(
  (data, ctx: ExecutionContext) => {
    const { user }: { user: TokenData } = ctx.switchToHttp().getRequest();
    return user;
  },
);
