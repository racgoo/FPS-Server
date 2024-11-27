import { Expose, Type } from 'class-transformer';
import { ChatRoomDto } from './chat-room.dto';

export class GetChatRoomRequest {}

export class GetChatRoomResponse {
  @Type(() => ChatRoomDto)
  @Expose()
  public readonly chatRooms: ChatRoomDto[];
}
