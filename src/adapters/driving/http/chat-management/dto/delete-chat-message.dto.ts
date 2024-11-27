import { IsNumber } from 'class-validator';

export class DeleteChatMessageRequest {
  @IsNumber()
  public readonly chatRoomId: number;
  @IsNumber()
  public readonly chatMessageId: number;
}

export class DeleteChatMessageResponse {}
