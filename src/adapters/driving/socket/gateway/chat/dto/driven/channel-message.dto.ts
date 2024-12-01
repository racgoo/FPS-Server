import { Exclude } from 'class-transformer';
import { IsString } from 'class-validator';
export class ChannelMessageDrivenDto {
  @Exclude()
  public static readonly endPoint = 'chat:channel-message';

  @IsString()
  public readonly content: string;
}
