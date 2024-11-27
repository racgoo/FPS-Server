import { Injectable } from '@nestjs/common';
import { EntityManager } from 'typeorm';
import { ChatRoom } from 'src/domains/chat/model/entity/chat-room.entity';
import { SqliteChatRoomEntity } from '../entities/sqlite-chat-room.entity';
import { ChatUser } from '@domains/chat/model/entity/chat-user.entity';
import { SqliteUserEntity } from '../entities/sqlite-user.entity';
import { SqliteChatMessageEntity } from '../entities/sqlite-chat-message.entity';
import { ChatMessage } from '@domains/chat/model/entity/chat-message.entity';
import { ChatRepositoryPort } from '@domains/chat/ports/driven/repository/chat.repository.port';

@Injectable()
export class SqliteChatRepository implements ChatRepositoryPort {
  constructor(private readonly entityManager: EntityManager) {}

  async createChatRoom(ownerId: number): Promise<ChatRoom> {
    const chatUserEntity = await this.entityManager.findOne(SqliteUserEntity, {
      where: { id: ownerId },
    });
    const chatRoomEntity = this.entityManager.create(SqliteChatRoomEntity, {
      name: 'test',
      chatMessages: [],
      chatUsers: [this.userToEntity(chatUserEntity)],
    });
    return this.chatRoomToDomain(chatRoomEntity);
  }

  async saveChatRoom(chatRoom: ChatRoom): Promise<ChatRoom> {
    const chatRoomEntity = this.chatRoomToEntity(chatRoom);
    const savedEntity = await this.entityManager.save(
      SqliteChatRoomEntity,
      chatRoomEntity,
    );
    return this.chatRoomToDomain(savedEntity);
  }

  async findChatRoomById(id: number): Promise<ChatRoom | null> {
    const chatRoomEntity = await this.entityManager.findOne(
      SqliteChatRoomEntity,
      {
        where: { id },
      },
    );
    return chatRoomEntity ? this.chatRoomToDomain(chatRoomEntity) : null;
  }

  async findChatRoomsByUserId(userId: number): Promise<ChatRoom[]> {
    const chatRoomEntities = await this.entityManager.find(
      SqliteChatRoomEntity,
      {
        relations: { chatUsers: true, chatMessages: true },
        where: { chatUsers: { id: userId } },
      },
    );
    return chatRoomEntities.map((entity) => this.chatRoomToDomain(entity));
  }

  async findChatUserById(userId: number): Promise<ChatUser | null> {
    const chatUserEntity = await this.entityManager.findOne(SqliteUserEntity, {
      where: { id: userId },
    });
    return chatUserEntity ? this.userToDomain(chatUserEntity) : null;
  }

  async deleteChatRoom(chatRoom: ChatRoom): Promise<void> {
    const chatRoomEntity = this.chatRoomToEntity(chatRoom);
    await this.entityManager.delete(SqliteChatRoomEntity, chatRoomEntity);
  }

  private chatRoomToEntity(domain: ChatRoom): SqliteChatRoomEntity {
    const entity = new SqliteChatRoomEntity();
    entity.id = domain.id;
    entity.chatUsers = domain.chatUsers?.map((user) => this.userToEntity(user));
    entity.chatMessages = domain.chatMessages?.map((message) =>
      this.chatMessageToEntity(message),
    );
    entity.name = domain.name;
    entity.createdAt = domain.createdAt;
    entity.updatedAt = domain.updatedAt;
    return entity;
  }

  private userToEntity(domain: ChatUser): SqliteUserEntity {
    const entity = new SqliteUserEntity();
    entity.id = domain.id;
    entity.name = domain.name;
    return entity;
  }

  private chatMessageToEntity(domain: ChatMessage): SqliteChatMessageEntity {
    const entity = new SqliteChatMessageEntity();
    entity.id = domain.id;
    entity.content = domain.content;
    return entity;
  }

  private chatRoomToDomain(entity: SqliteChatRoomEntity): ChatRoom {
    const domain = new ChatRoom();
    domain.id = entity.id;
    domain.name = entity.name;
    domain.createdAt = entity.createdAt;
    domain.updatedAt = entity.updatedAt;
    domain.chatUsers = entity.chatUsers?.map((user) => this.userToDomain(user));
    domain.chatMessages = entity.chatMessages?.map((message) =>
      this.chatMessageToDomain(message),
    );
    return domain;
  }

  private userToDomain(entity: SqliteUserEntity): ChatUser {
    const domain = new ChatUser();
    domain.id = entity.id;
    domain.name = entity.name;
    return domain;
  }

  private chatMessageToDomain(entity: SqliteChatMessageEntity): ChatMessage {
    const domain = new ChatMessage();
    domain.id = entity.id;
    domain.content = entity.content;
    return domain;
  }
}
