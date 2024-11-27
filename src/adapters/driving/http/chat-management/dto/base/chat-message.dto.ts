import { Expose, Type } from 'class-transformer';
import { ChatUserDto } from './chat-user.dto';

export class ChatMessageDto {
  @Expose()
  public readonly id: number;
  @Expose()
  public readonly content: string;
  @Expose()
  @Type(() => ChatUserDto)
  public readonly user: ChatUserDto;
  @Expose()
  public readonly createdAt: Date;
  @Expose()
  public readonly updatedAt: Date;
}
