import { Expose, Type } from 'class-transformer';
import { ChatMessageDto } from './chat-message.dto';
import { ChatUserDto } from './chat-user.dto';

export class ChatRoomDto {
  @Expose()
  public readonly id: number;
  @Expose()
  public readonly name: string;
  @Type(() => ChatMessageDto)
  @Expose()
  public readonly chatMessages: ChatMessageDto[];
  @Type(() => ChatUserDto)
  @Expose()
  public readonly users: ChatUserDto[];
  @Expose()
  public readonly createdAt: Date;
  @Expose()
  public readonly updatedAt: Date;
}
