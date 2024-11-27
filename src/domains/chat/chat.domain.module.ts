import { Module } from '@nestjs/common';
import { ChatService } from './services/chat.service';
import { CreateChatRoomUseCase } from './use-cases/create-chat-room.use-case';
import { DeleteChatRoomUseCase } from './use-cases/delete-chat-room.use-case';
import { EmailModule } from 'src/adapters/driven/email/email.modue';
import { SqliteModule } from '@adapters/driven/sqlite/sqlite.module';
import { GetChatRoomUseCase } from './use-cases/get-chat-room.use-case';

@Module({
  imports: [SqliteModule, EmailModule],
  providers: [
    ChatService,
    CreateChatRoomUseCase,
    GetChatRoomUseCase,
    DeleteChatRoomUseCase,
  ],
  exports: [CreateChatRoomUseCase, DeleteChatRoomUseCase, GetChatRoomUseCase],
})
export class ChatDomainModule {}
