import { Module } from '@nestjs/common';
import { ChatDomainModule } from 'src/domains/chat/chat.domain.module';

import { ChatManagementController } from './chat-management.controller';
import { ChatManagementService } from './chat-management.service';

@Module({
  imports: [ChatDomainModule],
  providers: [ChatManagementService],
  controllers: [ChatManagementController],
})
export class ChatManagementModule {}
