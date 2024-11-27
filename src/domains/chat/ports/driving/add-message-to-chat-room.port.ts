import { ChatRoom } from '../../model/entity/chat-room.entity';

export interface AddMessageToChatRoomPort {
  execute(params: {
    chatRoomId: number;
    content: string;
    userId: number;
  }): Promise<ChatRoom>;
}
