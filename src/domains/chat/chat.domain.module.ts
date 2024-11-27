import { Module } from '@nestjs/common';
import { ChatService } from './services/chat.service';
import { CreateChatRoomUseCase } from './use-cases/create-chat-room.use-case';
import { DeleteChatRoomUseCase } from './use-cases/delete-chat-room.use-case';
import { EmailModule } from 'src/adapters/driven/email/email.modue';
import { SqliteModule } from '@adapters/driven/sqlite/sqlite.module';
import { GetChatRoomUseCase } from './use-cases/get-chat-room.use-case';
import { DeleteUserFromChatRoomUseCase } from './use-cases/delete-user-from-chat-room.use-case';
import { DeleteMessageFromChatRoomUseCase } from './use-cases/delete-message-from-chat-room.use-case';
import { AddUserToChatRoomUseCase } from './use-cases/add-user-to-chat-room.use-case';
import { AddMessageToChatRoomUseCase } from './use-cases/add-message-to-chat-room.use-case';

@Module({
  imports: [SqliteModule, EmailModule],
  providers: [
    ChatService,
    CreateChatRoomUseCase,
    GetChatRoomUseCase,
    DeleteChatRoomUseCase,
    AddUserToChatRoomUseCase,
    AddMessageToChatRoomUseCase,
    DeleteUserFromChatRoomUseCase,
    DeleteMessageFromChatRoomUseCase,
  ],
  exports: [
    CreateChatRoomUseCase,
    DeleteChatRoomUseCase,
    GetChatRoomUseCase,
    AddUserToChatRoomUseCase,
    AddMessageToChatRoomUseCase,
    DeleteUserFromChatRoomUseCase,
    DeleteMessageFromChatRoomUseCase,
  ],
})
export class ChatDomainModule {}
