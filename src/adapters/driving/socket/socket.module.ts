import { Module } from '@nestjs/common';
import { AuthModule } from 'src/shared/modules/auth/auth.module';
import SocketService from './socket.service';
import { ChatGateway } from './gateway/chat/chat.gateway';
import { ParseModule } from '@shared/modules/parse/parse.module';

const gateways = [ChatGateway];

@Module({
  imports: [ParseModule, AuthModule],
  providers: [SocketService, ...gateways],
  exports: [...gateways],
})
export class SocketModule {}
