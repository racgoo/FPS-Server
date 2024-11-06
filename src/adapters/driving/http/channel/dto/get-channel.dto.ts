import { Expose, Type } from 'class-transformer';
import { IsArray, ValidateNested } from 'class-validator';
import { ChannelDto } from './channel.dto';

export class GetChannelsRequest {}

export class GetChannelsResponse {
  @Expose()
  @IsArray()
  @Type(() => ChannelDto)
  @ValidateNested({ each: true })
  channels: ChannelDto[];
}
