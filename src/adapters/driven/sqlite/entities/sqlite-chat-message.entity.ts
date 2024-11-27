import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

import { SqliteUserEntity } from './sqlite-user.entity';
import { SqliteChatRoomEntity } from './sqlite-chat-room.entity';

@Entity({ name: 'chat_message' })
export class SqliteChatMessageEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  content: string;

  @ManyToOne(() => SqliteChatRoomEntity, (room) => room.chatMessages)
  @JoinColumn({ name: 'chat_room_id' })
  chatRoom: SqliteChatRoomEntity;

  @ManyToOne(() => SqliteUserEntity, (user) => user.id, {
    eager: true,
  })
  @JoinColumn({ name: 'user_id' })
  user: SqliteUserEntity;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
