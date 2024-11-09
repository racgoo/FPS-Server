import { Module } from '@nestjs/common';
import { UserService } from './services/user.service';
import { CreateUserUseCase } from './use-cases/create-user.use-case';

import { UpdateUserUseCase } from './use-cases/update-user.use-case';
import { DeleteUserUseCase } from './use-cases/delete-user.use-case';
import { GetUserByIdUseCase } from './use-cases/get-user-by-id.use-case';
import { GetUserByEmailUseCase } from './use-cases/get-user-by-email.use-case';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SqliteUserEntity } from 'src/persistent/sqlite/entities/sqlite-user.entity';
import { GetExistenceByEmailUseCase } from './use-cases/get-existence-by-email.use-case';
import { EmailModule } from 'src/adapters/driven/email/email.modue';

@Module({
  imports: [TypeOrmModule.forFeature([SqliteUserEntity]), EmailModule],
  providers: [
    UserService,
    CreateUserUseCase,
    GetUserByIdUseCase,
    GetUserByEmailUseCase,
    UpdateUserUseCase,
    DeleteUserUseCase,
    GetExistenceByEmailUseCase,
  ],
  exports: [
    CreateUserUseCase,
    GetUserByIdUseCase,
    GetUserByEmailUseCase,
    UpdateUserUseCase,
    DeleteUserUseCase,
    GetExistenceByEmailUseCase,
  ],
})
export class UserDomainModule {}
