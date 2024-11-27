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

  @OneToMany(() => SqliteChatMessageEntity, (message) => message.chatRoom, {
    cascade: true,
  })
  chatMessages: SqliteChatMessageEntity[];

  @ManyToMany(() => SqliteUserEntity, (user) => user, {
    cascade: true,
  })
  @JoinTable({
    name: 'chat_room_user_mapping',
    joinColumn: {
      name: 'chat_room_id',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'user_id',
      referencedColumnName: 'id',
    },
  })
  users: SqliteUserEntity[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
