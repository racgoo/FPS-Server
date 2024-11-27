import { IsNumber } from 'class-validator';

export class DeleteChatUserRequest {
  @IsNumber()
  public readonly chatRoomId: number;
  @IsNumber()
  public readonly chatUserId: number;
}

export class DeleteChatUserResponse {}
