import { Injectable } from '@nestjs/common';
import { ChatRoom } from '../model/entity/chat-room.entity';
import { ChatService } from '../services/chat.service';
import { FailedToCreateChatRoomException } from '../exceptions/fail-to-create-chat-room.exception';
import { AddUserToChatRoomPort } from '../ports/driving/add-user-to-chat-room.port';

@Injectable()
export class AddUserToChatRoomUseCase implements AddUserToChatRoomPort {
  constructor(private readonly chatService: ChatService) {}

  async execute(userId: number, chatRoomId: number): Promise<ChatRoom> {
    try {
      const chatRoom = await this.chatService.findChatRoomById(chatRoomId);
      const chatUser = await this.chatService.findChatUserById(userId);
      return await this.chatService.addUserToChatRoom(chatUser, chatRoom);
    } catch {
      throw new FailedToCreateChatRoomException();
    }
  }
}
