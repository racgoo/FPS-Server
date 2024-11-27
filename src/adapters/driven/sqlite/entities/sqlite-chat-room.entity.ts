import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { SqliteUserEntity } from './sqlite-user.entity';
import { SqliteChatMessageEntity } from './sqlite-chat-message.entity';

@Entity({ name: 'chat_room' })
export class SqliteChatRoomEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @OneToMany(() => SqliteChatMessageEntity, (message) => message.chatRoom)
  chatMessages: SqliteChatMessageEntity[];

  @ManyToMany(() => SqliteUserEntity, (user) => user)
  @JoinTable()
  chatUsers: SqliteUserEntity[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
