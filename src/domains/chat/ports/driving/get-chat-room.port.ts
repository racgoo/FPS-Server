import { ChatRoom } from '../../model/entity/chat-room.entity';

export interface GetChatRoomPort {
  roomsWithUserId(userId: number): Promise<ChatRoom[]>;
  roomWithChatRoomId(chatRoomId: number): Promise<ChatRoom>;
}
