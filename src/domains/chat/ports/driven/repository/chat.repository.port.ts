import { ChatRoom } from '@domains/chat/model/entity/chat-room.entity';
import { ChatUser } from '@domains/chat/model/entity/chat-user.entity';

export const ChatRepositoryPortSymbol = Symbol('ChatRepositoryPort');

export interface ChatRepositoryPort {
  createChatRoom(ownerId: number): Promise<ChatRoom>;
  saveChatRoom(chatRoom: ChatRoom): Promise<ChatRoom>;
  findChatRoomById(id: number): Promise<ChatRoom | null>;
  findChatRoomsByUserId(userId: number): Promise<ChatRoom[]>;
  deleteChatRoom(chatRoom: ChatRoom): Promise<void>;
  findChatUserById(userId: number): Promise<ChatUser | null>;
}
