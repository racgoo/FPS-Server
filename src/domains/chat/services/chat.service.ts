import { Inject, Injectable } from '@nestjs/common';
import { ChatRoom } from '../model/entity/chat-room.entity';
import {
  ChatRepositoryPort,
  ChatRepositoryPortSymbol,
} from '../ports/driven/repository/chat.repository.port';
import { ChatUser } from '../model/entity/chat-user.entity';
import { ChatMessage } from '../model/entity/chat-message.entity';

@Injectable()
export class ChatService {
  constructor(
    @Inject(ChatRepositoryPortSymbol)
    private readonly chatRepository: ChatRepositoryPort,
  ) {}

  async createChatRoom(user: ChatUser): Promise<ChatRoom> {
    return await this.chatRepository.createChatRoom(user);
  }

  addUserToChatRoom({
    user,
    chatRoom,
  }: {
    user: ChatUser;
    chatRoom: ChatRoom;
  }): ChatRoom {
    chatRoom.addChatUser({ ...user });
    return chatRoom;
  }

  deleteUserFromChatRoom({
    chatUserId,
    chatRoom,
  }: {
    chatUserId: number;
    chatRoom: ChatRoom;
  }): ChatRoom {
    chatRoom.deleteChatUser(chatUserId);
    return chatRoom;
  }

  addChatMessageToChatRoom({
    chatMessage,
    chatRoom,
  }: {
    chatMessage: ChatMessage;
    chatRoom: ChatRoom;
  }): ChatRoom {
    chatRoom.addChatMessage({ ...chatMessage });
    return chatRoom;
  }

  deleteChatMessageFromChatRoom({
    chatMessageId,
    chatRoom,
  }: {
    chatMessageId: number;
    chatRoom: ChatRoom;
  }): ChatRoom {
    chatRoom.deleteChatMessage(chatMessageId);
    return chatRoom;
  }

  async findChatRoomById(chatRoomId: number): Promise<ChatRoom> {
    return await this.chatRepository.findChatRoomById(chatRoomId);
  }

  async findChatRoomsByUserId(userId: number): Promise<ChatRoom[]> {
    return await this.chatRepository.findChatRoomsByUserId(userId);
  }

  async findChatUserById(userId: number): Promise<ChatUser> {
    return await this.chatRepository.findChatUserById(userId);
  }

  async deleteChatRoom(chatRoomId: number): Promise<void> {
    await this.chatRepository.deleteChatRoom(chatRoomId);
  }

  async saveChatRoom(chatRoom: ChatRoom): Promise<ChatRoom> {
    return await this.chatRepository.saveChatRoom(chatRoom);
  }
}
