import { Injectable } from '@nestjs/common';
import { ChatService } from '../services/chat.service';
import { DeleteChatRoomPort } from '../ports/driving/delete-chat-room.port';
import { FailedToDeleteChatRoomException } from '../exceptions/fail-to-delete-chat-room.exception';
import { ChatRoom } from '../model/entity/chat-room.entity';

@Injectable()
export class DeleteChatRoomUseCase implements DeleteChatRoomPort {
  constructor(private readonly chatService: ChatService) {}
  async execute(chatRoom: ChatRoom) {
    try {
      await this.chatService.deleteChatRoom(chatRoom);
    } catch {
      throw new FailedToDeleteChatRoomException();
    }
  }
}
