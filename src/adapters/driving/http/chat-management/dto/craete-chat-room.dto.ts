import { Expose, Type } from 'class-transformer';
import { ChatRoomDto } from './base/chat-room.dto';
import { IsArray, IsNumber } from 'class-validator';

export class CreateChatRoomRequest {
  @IsArray()
  @IsNumber({}, { each: true })
  public readonly userIds: number[];
}

export class CreateChatRoomResponse {
  @Type(() => ChatRoomDto)
  @Expose()
  public readonly chatRooms: ChatRoomDto[];
}
