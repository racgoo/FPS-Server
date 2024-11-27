import { ChatRoom } from '../../model/entity/chat-room.entity';

export interface DeleteChatRoomPort {
  execute(chatRoom: ChatRoom): Promise<void>;
}
