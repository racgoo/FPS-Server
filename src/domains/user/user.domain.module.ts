import { Module } from '@nestjs/common';
import { UserService } from './services/user.service';
import { CreateUserUseCase } from './use-cases/create-user.use-case';

import { DeleteUserUseCase } from './use-cases/delete-user.use-case';
import { GetUserByIdUseCase } from './use-cases/get-user-by-id.use-case';
import { GetUserByEmailUseCase } from './use-cases/get-user-by-email.use-case';
import { GetExistenceByEmailUseCase } from './use-cases/get-existence-by-email.use-case';
import { EmailModule } from 'src/adapters/driven/email/email.modue';
import { SqliteModule } from '@adapters/driven/sqlite/sqlite.module';

@Module({
  imports: [SqliteModule, EmailModule],
  providers: [
    UserService,
    CreateUserUseCase,
    GetUserByIdUseCase,
    GetUserByEmailUseCase,
    DeleteUserUseCase,
    GetExistenceByEmailUseCase,
  ],
  exports: [
    CreateUserUseCase,
    GetUserByIdUseCase,
    GetUserByEmailUseCase,
    DeleteUserUseCase,
    GetExistenceByEmailUseCase,
  ],
})
export class UserDomainModule {}
