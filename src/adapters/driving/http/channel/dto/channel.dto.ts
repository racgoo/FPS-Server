import { Expose } from 'class-transformer';
import { IsNumber, IsString } from 'class-validator';

export class ChannelDto {
  @Expose()
  @IsString()
  public readonly ip: string;
  @Expose()
  @IsNumber()
  public readonly id: number;
}
