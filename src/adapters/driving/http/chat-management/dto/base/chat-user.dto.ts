import { Exclude, Expose } from 'class-transformer';
import { IsEnum } from 'class-validator';
import { UserType } from 'src/domains/user/model/vo/user-type.vo';

export class ChatUserDto {
  @Expose()
  public readonly id: number;
  @Expose()
  public readonly name: string;
  @Exclude()
  @IsEnum(UserType)
  public readonly type: UserType;
  @Exclude()
  public readonly email: string;
  @Exclude()
  public readonly createdAt: Date;
  @Exclude()
  public readonly updatedAt: Date;
}
