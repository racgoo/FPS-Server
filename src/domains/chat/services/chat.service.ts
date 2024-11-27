import { Inject, Injectable } from '@nestjs/common';
import { ChatRoom } from '../model/entity/chat-room.entity';
import {
  ChatRepositoryPort,
  ChatRepositoryPortSymbol,
} from '../ports/driven/repository/chat.repository.port';
import { ChatUser } from '../model/entity/chat-user.entity';

@Injectable()
export class ChatService {
  constructor(
    @Inject(ChatRepositoryPortSymbol)
    private readonly chatRepository: ChatRepositoryPort,
  ) {}

  async createChatRoom(ownerId: number): Promise<ChatRoom> {
    return await this.chatRepository.createChatRoom(ownerId);
  }

  async addUserToChatRoom(
    user: ChatUser,
    chatRoom: ChatRoom,
  ): Promise<ChatRoom> {
    chatRoom.chatUsers.push(user);
    return await this.chatRepository.saveChatRoom(chatRoom);
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

  async deleteChatRoom(chatRoom: ChatRoom): Promise<void> {
    await this.chatRepository.deleteChatRoom(chatRoom);
  }

  async saveChatRoom(chatRoom: ChatRoom): Promise<ChatRoom> {
    return await this.chatRepository.saveChatRoom(chatRoom);
  }
}
