import { ChatRoom } from '../../model/entity/chat-room.entity';

export interface CreateChatRoomPort {
  execute(params: { ownerId: number }): Promise<ChatRoom>;
}
