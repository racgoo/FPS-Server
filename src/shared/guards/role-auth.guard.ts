import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

import { TokenData } from '../modules/auth/auth.interface';
import { UserType } from 'src/domains/user/model/vo/user-type.vo';
import { ForbiddenException } from '../modules/auth/exceptions/forbidden.exception';

export const ROLES_KEY = 'roles';

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(private reflector: Reflector) {}
  canActivate(context: ExecutionContext): boolean {
    const roles = this.reflector.get<UserType[]>(
      ROLES_KEY,
      context.getHandler(),
    );
    if (!roles) return true;
    const { user }: { user: TokenData } = context.switchToHttp().getRequest();
    if (!this.matchRoles(roles, user.payload.type)) {
      throw new ForbiddenException();
    }
    return true;
  }
  matchRoles(roles: UserType[], userRole: UserType) {
    return roles.some((role) => role === userRole);
  }
}
