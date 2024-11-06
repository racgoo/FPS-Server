import { UserType } from 'src/persistent/sqlite/entities/sqlite-user.entity';
import { ROLES_KEY } from '../guards/role-auth.guard';
import { SetMetadata } from '@nestjs/common';

export const Roles = (...roles: UserType[]) => SetMetadata(ROLES_KEY, roles);
