import { Injectable } from '@nestjs/common';
import { ChatRoom } from '../model/entity/chat-room.entity';
import { ChatService } from '../services/chat.service';
import { AddUserToChatRoomPort } from '../ports/driving/add-user-to-chat-room.port';
import { FailedToAddUserToChatRoomException } from '../exceptions/failed-to-add-user-to-chat-room.exception';
import { Transactional } from 'typeorm-transactional';

@Injectable()
export class AddUserToChatRoomUseCase implements AddUserToChatRoomPort {
  constructor(private readonly chatService: ChatService) {}

  @Transactional()
  async execute(params: {
    userId: number;
    chatRoomId: number;
  }): Promise<ChatRoom> {
    const { userId, chatRoomId } = params;
    try {
      const chatRoom = await this.chatService.findChatRoomById(chatRoomId);
      const chatUser = await this.chatService.findChatUserById(userId);
      const updatedChatRoom = this.chatService.addUserToChatRoom({
        user: chatUser,
        chatRoom,
      });
      await this.chatService.saveChatRoom(updatedChatRoom);
      return updatedChatRoom;
    } catch {
      throw new FailedToAddUserToChatRoomException();
    }
  }
}
