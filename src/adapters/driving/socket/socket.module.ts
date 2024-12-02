import { Module } from '@nestjs/common';
import { AuthModule } from 'src/shared/modules/auth/auth.module';
import SocketService from './socket.service';
// import { ChatGateway } from './gateway/chat/chat.gateway';
import { ParseModule } from '@shared/modules/parse/parse.module';
// import { UserDomainModule } from '@domains/user/user.domain.module';
import { ChatGatewayModule } from './gateway/chat/chat.gateway.module';

const gatewayModules = [ChatGatewayModule];
const sharedModules = [ParseModule, AuthModule];

@Module({
  imports: [...sharedModules, ...gatewayModules],
  providers: [SocketService, ...gatewayModules],
  exports: [SocketService],
})
export class SocketModule {}
