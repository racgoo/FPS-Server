import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ChatManagementService } from './chat-management.service';
import { ResponseType } from 'src/shared/decorators/response-type.decorator';

import { EnvService } from 'src/shared/modules/env/env.service';
import { GetChatRoomResponse } from './dto/get-chat-room.dto';
import { JwtAuthGuard } from 'src/shared/guards/jwt-auth.guard';
import { CreateChatRoomResponse } from './dto/craete-chat-room.dto';
import { GetTokenData } from 'src/shared/decorators/get-user.decorator';
import { TokenData } from 'src/shared/modules/auth/auth.interface';

@Controller('chat-management')
export class ChatManagementController {
  constructor(
    private readonly chatManagementService: ChatManagementService,
    private readonly envService: EnvService,
  ) {}

  @Get('chat-room')
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.OK)
  @ResponseType(GetChatRoomResponse)
  async getChatRooms(@GetTokenData() tokenData: TokenData) {
    return {
      chatRooms: await this.chatManagementService.getChatRoomsWithUserId(
        tokenData.payload.id,
      ),
    };
  }

  @Post('chat-room')
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.OK)
  @ResponseType(CreateChatRoomResponse)
  async createChatRoom(@GetTokenData() tokenData: TokenData) {
    return await this.chatManagementService.createChatRoom(
      tokenData.payload.id,
    );
  }
}
