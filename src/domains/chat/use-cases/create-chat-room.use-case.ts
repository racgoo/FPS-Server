import { Injectable } from '@nestjs/common';
import { CreateChatRoomPort } from '../ports/driving/create-chat-room.port';
import { ChatRoom } from '../model/entity/chat-room.entity';
import { ChatService } from '../services/chat.service';
import { FailedToCreateChatRoomException } from '../exceptions/fail-to-create-chat-room.exception';

@Injectable()
export class CreateChatRoomUseCase implements CreateChatRoomPort {
  constructor(private readonly chatService: ChatService) {}

  async execute(params: { ownerId: number }): Promise<ChatRoom> {
    const { ownerId } = params;
    try {
      const owner = await this.chatService.findChatUserById(ownerId);
      const newChatRoom = await this.chatService.createChatRoom(owner);
      await this.chatService.saveChatRoom(newChatRoom);
      return newChatRoom;
    } catch {
      throw new FailedToCreateChatRoomException();
    }
  }
}
