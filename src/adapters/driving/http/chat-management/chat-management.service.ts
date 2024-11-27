import { AddMessageToChatRoomUseCase } from '@domains/chat/use-cases/add-message-to-chat-room.use-case';
import { AddUserToChatRoomUseCase } from '@domains/chat/use-cases/add-user-to-chat-room.use-case';
import { CreateChatRoomUseCase } from '@domains/chat/use-cases/create-chat-room.use-case';
import { DeleteChatRoomUseCase } from '@domains/chat/use-cases/delete-chat-room.use-case';
import { DeleteMessageFromChatRoomUseCase } from '@domains/chat/use-cases/delete-message-from-chat-room.use-case';
import { DeleteUserFromChatRoomUseCase } from '@domains/chat/use-cases/delete-user-from-chat-room.use-case';
import { GetChatRoomUseCase } from '@domains/chat/use-cases/get-chat-room.use-case';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ChatManagementService {
  constructor(
    private readonly createChatRoomUseCase: CreateChatRoomUseCase,
    private readonly getChatRoomUseCase: GetChatRoomUseCase,
    private readonly deleteChatRoomUseCase: DeleteChatRoomUseCase,
    private readonly deleteUserFromChatRoomUseCase: DeleteUserFromChatRoomUseCase,
    private readonly deleteMessageFromChatRoomUseCase: DeleteMessageFromChatRoomUseCase,
    private readonly addUserToChatRoomUseCase: AddUserToChatRoomUseCase,
    private readonly addMessageToChatRoomUseCase: AddMessageToChatRoomUseCase,
  ) {}

  async getChatRoomsWithUserId(userId: number) {
    return await this.getChatRoomUseCase.roomsWithUserId({ userId });
  }

  async getChatRoomWithChatRoomId(chatRoomId: number) {
    return await this.getChatRoomUseCase.roomWithChatRoomId({ chatRoomId });
  }

  async createChatRoom(ownerId: number) {
    return await this.createChatRoomUseCase.execute({ ownerId });
  }

  async addUserToChatRoom(chatRoomId: number, userId: number) {
    return await this.addUserToChatRoomUseCase.execute({ chatRoomId, userId });
  }

  async addMessageToChatRoom(params: {
    chatRoomId: number;
    content: string;
    userId: number;
  }) {
    const { chatRoomId, content, userId } = params;
    return await this.addMessageToChatRoomUseCase.execute({
      content,
      chatRoomId,
      userId,
    });
  }

  async deleteChatRoom(chatRoomId: number) {
    return await this.deleteChatRoomUseCase.execute({ chatRoomId });
  }

  async deleteChatUser(chatRoomId: number, chatUserId: number) {
    return await this.deleteUserFromChatRoomUseCase.execute({
      chatRoomId,
      chatUserId,
    });
  }

  async deleteChatMessage(chatRoomId: number, chatMessageId: number) {
    return await this.deleteMessageFromChatRoomUseCase.execute({
      chatRoomId,
      chatMessageId,
    });
  }
}
