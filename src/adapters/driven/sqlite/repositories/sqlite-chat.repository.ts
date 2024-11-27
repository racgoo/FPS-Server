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

  async createChatRoom(owner: ChatUser): Promise<ChatRoom> {
    const chatRoomEntity = this.entityManager.create(SqliteChatRoomEntity, {
      name: 'test',
      chatMessages: [],
      users: [this.userToEntity(owner)],
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
        relations: { users: true, chatMessages: { user: true } },
        where: { id },
      },
    );
    return chatRoomEntity ? this.chatRoomToDomain(chatRoomEntity) : null;
  }

  async findChatRoomsByUserId(userId: number): Promise<ChatRoom[]> {
    const chatRoomEntities = await this.entityManager
      .createQueryBuilder(SqliteChatRoomEntity, 'chatRoom')
      .innerJoinAndSelect('chatRoom.users', 'users')
      .leftJoinAndSelect('chatRoom.chatMessages', 'messages')
      .leftJoinAndSelect('messages.user', 'messageUser')
      .where(() => {
        return 'EXISTS (SELECT 1 FROM chat_room_user_mapping m WHERE m.chat_room_id = chatRoom.id AND m.user_id = :userId)';
      })
      .setParameter('userId', userId)
      .getMany();

    return chatRoomEntities.map((entity) => this.chatRoomToDomain(entity));
  }
  //   async findChatRoomsByUserId(userId: number): Promise<ChatRoom[]> {
  //     const chatRoomEntities = await this.entityManager.find(
  //       SqliteChatRoomEntity,
  //       {
  //         relations: {
  //           users: true,
  //           chatMessages: { user: true },
  //         },
  //         where: { users: [{ id: userId }] },
  //       },
  //     );

  //     return chatRoomEntities.map((entity) => this.chatRoomToDomain(entity));
  //   }

  async findChatUserById(userId: number): Promise<ChatUser | null> {
    const chatUserEntity = await this.entityManager.findOne(SqliteUserEntity, {
      where: { id: userId },
    });
    return chatUserEntity ? this.userToDomain(chatUserEntity) : null;
  }

  async deleteChatRoom(chatRoomId: number): Promise<void> {
    await this.entityManager.delete(SqliteChatRoomEntity, chatRoomId);
  }

  private chatRoomToEntity(domain: ChatRoom): SqliteChatRoomEntity {
    const entity = new SqliteChatRoomEntity();
    entity.users = domain.users?.map((user) => this.userToEntity(user));
    entity.chatMessages = domain.chatMessages?.map((message) =>
      this.chatMessageToEntity(message),
    );
    entity.name = domain.name;
    entity.createdAt = domain.createdAt;
    entity.updatedAt = domain.updatedAt;
    if (domain.id) {
      entity.id = domain.id;
    }
    return entity;
  }

  private userToEntity(domain: ChatUser): SqliteUserEntity {
    const entity = new SqliteUserEntity();
    entity.id = domain.id;
    entity.name = domain.name;
    entity.email = domain.email;
    entity.type = domain.type;
    entity.password = domain.password;
    entity.createdAt = domain.createdAt;
    entity.updatedAt = domain.updatedAt;
    return entity;
  }

  private chatMessageToEntity(domain: ChatMessage): SqliteChatMessageEntity {
    const entity = new SqliteChatMessageEntity();
    entity.content = domain.content;
    entity.id = domain.id;
    entity.createdAt = domain.createdAt;
    entity.updatedAt = domain.updatedAt;
    if (domain.user) {
      entity.user = this.userToEntity(domain.user);
    }
    return entity;
  }

  private chatRoomToDomain(entity: SqliteChatRoomEntity): ChatRoom {
    const domain = new ChatRoom();
    domain.id = entity.id;
    domain.name = entity.name;
    domain.createdAt = entity.createdAt;
    domain.updatedAt = entity.updatedAt;

    if (entity.users) {
      domain.users = entity.users?.map((user) => this.userToDomain(user));
    }
    if (entity.chatMessages) {
      domain.chatMessages = entity.chatMessages?.map((message) =>
        this.chatMessageToDomain(message),
      );
    }
    return domain;
  }

  private userToDomain(entity: SqliteUserEntity): ChatUser {
    const domain = new ChatUser();
    domain.id = entity.id;
    domain.name = entity.name;
    domain.email = entity.email;
    domain.type = entity.type;
    domain.password = entity.password;
    domain.createdAt = entity.createdAt;
    domain.updatedAt = entity.updatedAt;
    return domain;
  }

  private chatMessageToDomain(entity: SqliteChatMessageEntity): ChatMessage {
    const domain = new ChatMessage();
    domain.id = entity.id;
    domain.content = entity.content;
    domain.createdAt = entity.createdAt;
    domain.updatedAt = entity.updatedAt;
    if (entity.user) {
      domain.user = this.userToDomain(entity.user);
    }
    return domain;
  }
}
