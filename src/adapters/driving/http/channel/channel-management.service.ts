import { Injectable } from '@nestjs/common';
import { EnvService } from 'src/shared/modules/env/env.service';
import { ChannelDto } from './dto/channel.dto';

@Injectable()
export class ChannelManagementService {
  constructor(private readonly envService: EnvService) {}

  async getChannels() {
    //redis channel system으로 이전해야함
    const channelId = this.envService.get('CHANNEL_ID');
    const channelIp = this.envService.get('CHANNEL_IP');
    const currentChannel: ChannelDto = { id: channelId, ip: channelIp };
    return [currentChannel];
  }
}
