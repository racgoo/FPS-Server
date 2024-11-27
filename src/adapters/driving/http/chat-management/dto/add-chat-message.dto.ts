import { IsNumber, IsString } from 'class-validator';

export class AddChatMessageRequest {
  @IsNumber()
  public readonly chatRoomId: number;
  @IsString()
  public readonly content: string;
}

export class AddChatMessageResponse {}
