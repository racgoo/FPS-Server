import { Injectable } from '@nestjs/common';
import { ChatService } from '../services/chat.service';
import { DeleteChatRoomPort } from '../ports/driving/delete-chat-room.port';
import { FailedToDeleteChatRoomException } from '../exceptions/fail-to-delete-chat-room.exception';

@Injectable()
export class DeleteChatRoomUseCase implements DeleteChatRoomPort {
  constructor(private readonly chatService: ChatService) {}
  async execute(params: { chatRoomId: number }) {
    const { chatRoomId } = params;
    try {
      await this.chatService.deleteChatRoom(chatRoomId);
    } catch {
      throw new FailedToDeleteChatRoomException();
    }
  }
}
