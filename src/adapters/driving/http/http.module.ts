import { Module } from '@nestjs/common';
import { AuthModule } from 'src/shared/modules/auth/auth.module';
import { ChannelManagementModule } from './channel/channel-management.module';
import { UserManagementModule } from './user-management/user-management.module';
import { ChatManagementModule } from './chat-management/chat-management.module';

@Module({
  imports: [
    AuthModule,
    ChannelManagementModule,
    UserManagementModule,
    ChatManagementModule,
  ],
  providers: [
    ChannelManagementModule,
    UserManagementModule,
    ChatManagementModule,
  ],
})
export class HttpModule {}
