import { CreateChatRoomUseCase } from '@domains/chat/use-cases/create-chat-room.use-case';
import { GetChatRoomUseCase } from '@domains/chat/use-cases/get-chat-room.use-case';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ChatManagementService {
  constructor(
    private readonly createChatRoomUseCase: CreateChatRoomUseCase,
    private readonly getChatRoomUseCase: GetChatRoomUseCase,
  ) {}

  async getChatRoomsWithUserId(userId: number) {
    return await this.getChatRoomUseCase.roomsWithUserId(userId);
  }

  async getChatRoomWithChatRoomId(chatRoomId: number) {
    return await this.getChatRoomUseCase.roomWithChatRoomId(chatRoomId);
  }

  async createChatRoom(ownerId: number) {
    return await this.createChatRoomUseCase.execute(ownerId);
  }
}
