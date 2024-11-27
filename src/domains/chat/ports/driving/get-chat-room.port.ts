import { ChatRoom } from '../../model/entity/chat-room.entity';

export interface GetChatRoomPort {
  roomsWithUserId(params: { userId: number }): Promise<ChatRoom[]>;
  roomWithChatRoomId(params: { chatRoomId: number }): Promise<ChatRoom>;
}
