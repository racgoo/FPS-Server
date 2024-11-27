import { ChatRoom } from '../../model/entity/chat-room.entity';

export interface CreateChatRoomPort {
  execute(ownerId: number): Promise<ChatRoom>;
}
