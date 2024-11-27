import { IsNumber } from 'class-validator';

export class DeleteChatRoomRequest {
  @IsNumber()
  public readonly chatRoomId: number;
}

export class DeleteChatRoomResponse {}
