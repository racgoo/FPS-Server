import { ChatRoom } from '../../model/entity/chat-room.entity';

export interface AddUserToChatRoomPort {
  execute(userId: number, chatRoomId: number): Promise<ChatRoom>;
}
