import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  UseGuards,
} from '@nestjs/common';
import { ChannelManagementService } from './channel-management.service';
import { GetChannelsResponse } from './dto/get-channel.dto';
import { ResponseType } from 'src/shared/decorators/response-type.decorator';
import { JwtAuthGuard } from 'src/shared/guards/jwt-auth.guard';

// import { JwtTokens } from 'src/shared/decorators/jwt-token.decorator.guard';

@Controller('channel-management')
export class ChannelManagementController {
  constructor(
    private readonly channelManagementService: ChannelManagementService,
  ) {}

  @Get('/channels')
  @UseGuards(JwtAuthGuard)
  @ResponseType(GetChannelsResponse)
  @HttpCode(HttpStatus.OK)
  async getChannels() {
    const channels = await this.channelManagementService.getChannels();
    return { channels };
  }
}
