import { Injectable } from '@nestjs/common';
import { CreateChatRoomPort } from '../ports/driving/create-chat-room.port';
import { ChatRoom } from '../model/entity/chat-room.entity';
import { ChatService } from '../services/chat.service';
import { FailedToCreateChatRoomException } from '../exceptions/fail-to-create-chat-room.exception';

@Injectable()
export class CreateChatRoomUseCase implements CreateChatRoomPort {
  constructor(private readonly chatService: ChatService) {}

  async execute(ownerId: number): Promise<ChatRoom> {
    try {
      const newChatRoom = await this.chatService.createChatRoom(ownerId);
      await this.chatService.saveChatRoom(newChatRoom);
      return newChatRoom;
    } catch {
      throw new FailedToCreateChatRoomException();
    }
  }
}
