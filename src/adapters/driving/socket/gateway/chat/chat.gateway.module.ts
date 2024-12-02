import { UserDomainModule } from '@domains/user/user.domain.module';
import { forwardRef, Module } from '@nestjs/common';
import { ChatGateway } from './chat.gateway';
import { AuthModule } from '@shared/modules/auth/auth.module';
import { SocketModule } from '../../socket.module';

const domainModules = [UserDomainModule];
const sharedModules = [AuthModule];
const baseModules = [forwardRef(() => SocketModule)];

@Module({
  imports: [...domainModules, ...sharedModules, ...baseModules],
  providers: [ChatGateway],
})
export class ChatGatewayModule {}
