import { Injectable } from '@nestjs/common';
import { ChatRoom } from '../model/entity/chat-room.entity';
import { ChatService } from '../services/chat.service';
import { FailedToGetChatRoomException } from '../exceptions/fail-to-get-chat-room.exception';
import { GetChatRoomPort } from '../ports/driving/get-chat-room.port';

@Injectable()
export class GetChatRoomUseCase implements GetChatRoomPort {
  constructor(private readonly chatService: ChatService) {}

  async roomsWithUserId(params: { userId: number }): Promise<ChatRoom[]> {
    const { userId } = params;
    try {
      return await this.chatService.findChatRoomsByUserId(userId);
    } catch {
      throw new FailedToGetChatRoomException();
    }
  }

  async roomWithChatRoomId(params: { chatRoomId: number }): Promise<ChatRoom> {
    const { chatRoomId } = params;
    try {
      return await this.chatService.findChatRoomById(chatRoomId);
    } catch {
      throw new FailedToGetChatRoomException();
    }
  }
}
