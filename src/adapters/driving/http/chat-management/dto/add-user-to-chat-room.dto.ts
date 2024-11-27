import { IsNumber } from 'class-validator';

export class AddUserToChatRoomRequest {
  @IsNumber()
  public readonly chatRoomId: number;
  @IsNumber()
  public readonly userId: number;
}

export class AddUserToChatRoomResponse {}
