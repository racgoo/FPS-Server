import { Exclude } from 'class-transformer';
import { IsNumber, IsString } from 'class-validator';

export class UserMessageDrivingDto {
  @Exclude()
  public static readonly endPoint = 'chat:user-message';

  @IsNumber()
  public readonly targetId: number;

  @IsString()
  public readonly content: string;
}
