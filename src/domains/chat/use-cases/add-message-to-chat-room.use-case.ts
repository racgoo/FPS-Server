import { Injectable } from '@nestjs/common';
import { ChatService } from '../services/chat.service';
import { AddMessageToChatRoomPort } from '../ports/driving/add-message-to-chat-room.port';
import { ChatRoom } from '../model/entity/chat-room.entity';
import { FailedToAddMessageToChatRoomException } from '../exceptions/failed-to-add-message-to-chat-room.exception';
import { Transactional } from 'typeorm-transactional';

@Injectable()
export class AddMessageToChatRoomUseCase implements AddMessageToChatRoomPort {
  constructor(private readonly chatService: ChatService) {}

  @Transactional()
  async execute(params: {
    content: string;
    chatRoomId: number;
    userId: number;
  }): Promise<ChatRoom> {
    const { content, chatRoomId, userId } = params;
    try {
      const chatRoom = await this.chatService.findChatRoomById(chatRoomId);
      const chatUser = await this.chatService.findChatUserById(userId);

      const updatedChatRoom = this.chatService.addChatMessageToChatRoom({
        chatMessage: {
          content,
          user: chatUser,
        },
        chatRoom,
      });
      return await this.chatService.saveChatRoom(updatedChatRoom);
    } catch {
      throw new FailedToAddMessageToChatRoomException();
    }
  }
}
