import { Injectable } from '@nestjs/common';
import { ChatService } from '../services/chat.service';
import { DeleteUserFromChatRoomPort } from '../ports/driving/delete-user-from-chat-room.port';
import { FailedToDeleteUserFromChatRoomException } from '../exceptions/fail-to-delete-user-from-chat-room.exception';

@Injectable()
export class DeleteUserFromChatRoomUseCase
  implements DeleteUserFromChatRoomPort
{
  constructor(private readonly chatService: ChatService) {}
  async execute(params: { chatRoomId: number; chatUserId: number }) {
    const { chatRoomId, chatUserId } = params;
    try {
      const chatRoom = await this.chatService.findChatRoomById(chatRoomId);
      await this.chatService.deleteUserFromChatRoom({
        chatUserId,
        chatRoom,
      });
    } catch {
      throw new FailedToDeleteUserFromChatRoomException();
    }
  }
}
