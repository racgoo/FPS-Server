import { Module } from '@nestjs/common';
import { ChannelManagementService } from './channel-management.service';
import { ChannelManagementController } from './channel-management.controller';

@Module({
  imports: [],
  providers: [ChannelManagementService],
  controllers: [ChannelManagementController],
})
export class ChannelManagementModule {}
