import { Injectable } from '@nestjs/common';
import { ChatService } from '../services/chat.service';
import { FailedToDeleteMessageFromChatRoomException } from '../exceptions/fail-to-delete-message-from-chat-room.exception';
import { DeleteMessageFromChatRoomPort } from '../ports/driving/delete-message-from-chat-room.port';
import { Transactional } from 'typeorm-transactional';

@Injectable()
export class DeleteMessageFromChatRoomUseCase
  implements DeleteMessageFromChatRoomPort
{
  constructor(private readonly chatService: ChatService) {}

  @Transactional()
  async execute(params: { chatRoomId: number; chatMessageId: number }) {
    const { chatRoomId, chatMessageId } = params;
    try {
      const chatRoom = await this.chatService.findChatRoomById(chatRoomId);
      await this.chatService.deleteChatMessageFromChatRoom({
        chatMessageId,
        chatRoom,
      });
    } catch {
      throw new FailedToDeleteMessageFromChatRoomException();
    }
  }
}
