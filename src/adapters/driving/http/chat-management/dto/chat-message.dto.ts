import { Expose } from 'class-transformer';

export class ChatMessageDto {
  @Expose()
  public readonly id: number;
  @Expose()
  public readonly content: string;
  @Expose()
  public readonly createdAt: Date;
  @Expose()
  public readonly updatedAt: Date;
}
