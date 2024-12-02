import { Exclude } from 'class-transformer';
import { IsString } from 'class-validator';
export class UserMessageDrivenDto {
  @Exclude()
  public static readonly endPoint = 'chat:user-message';

  @IsString()
  public readonly content: string;

  @IsString()
  public readonly name: string;
}
