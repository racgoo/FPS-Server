import { Exclude } from 'class-transformer';
import { IsString } from 'class-validator';

export class ChannelMessageDrivingDto {
  @Exclude()
  public static readonly endPoint = 'chat:channel-message';

  @IsString()
  public readonly content: string;
}
