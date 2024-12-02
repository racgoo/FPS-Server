import { Module } from '@nestjs/common';
import { AuthModule } from 'src/shared/modules/auth/auth.module';
import SocketService from './socket.service';
import { ChatGateway } from './gateway/chat/chat.gateway';
import { ParseModule } from '@shared/modules/parse/parse.module';
import { UserDomainModule } from '@domains/user/user.domain.module';

const gateways = [ChatGateway];
const domainModules = [UserDomainModule];
@Module({
  imports: [ParseModule, AuthModule, ...domainModules],
  providers: [SocketService, ...gateways],
  exports: [...gateways],
})
export class SocketModule {}
