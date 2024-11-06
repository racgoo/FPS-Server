import { Module } from '@nestjs/common';
import { UserDomainModule } from 'src/domains/user/user.domain.module';
import { UserManagementController } from './user-management.controller';
import { UserManagementService } from './user-management.service';
import { AuthModule } from 'src/shared/modules/auth/auth.module';
import { CryptoModule } from 'src/shared/modules/crypto/crypto.module';

@Module({
  imports: [UserDomainModule, AuthModule, CryptoModule],
  providers: [UserManagementService],
  controllers: [UserManagementController],
})
export class UserManagementModule {}
