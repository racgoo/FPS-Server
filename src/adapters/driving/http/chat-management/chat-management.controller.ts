import {
  Body,
  Controller,
  Delete,
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
import {
  DeleteChatRoomRequest,
  DeleteChatRoomResponse,
} from './dto/delete-chat-room.dto';
import {
  DeleteChatUserRequest,
  DeleteChatUserResponse,
} from './dto/delete-chat-user.dto';
import {
  DeleteChatMessageRequest,
  DeleteChatMessageResponse,
} from './dto/delete-chat-message.dto';
import {
  AddUserToChatRoomRequest,
  AddUserToChatRoomResponse,
} from './dto/add-user-to-chat-room.dto';
import {
  AddChatMessageRequest,
  AddChatMessageResponse,
} from './dto/add-chat-message.dto';

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

  @Delete('chat-room')
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.OK)
  @ResponseType(DeleteChatRoomResponse)
  async deleteChatRoom(@Body() body: DeleteChatRoomRequest) {
    return await this.chatManagementService.deleteChatRoom(body.chatRoomId);
  }

  @Post('chat-user')
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.OK)
  @ResponseType(AddUserToChatRoomResponse)
  async addUserToChatRoom(@Body() body: AddUserToChatRoomRequest) {
    return await this.chatManagementService.addUserToChatRoom(
      body.chatRoomId,
      body.userId,
    );
  }

  @Post('chat-message')
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.OK)
  @ResponseType(AddChatMessageResponse)
  async addChatMessage(
    @Body() body: AddChatMessageRequest,
    @GetTokenData() tokenData: TokenData,
  ) {
    return await this.chatManagementService.addMessageToChatRoom({
      chatRoomId: body.chatRoomId,
      content: body.content,
      userId: tokenData.payload.id,
    });
  }

  @Delete('chat-user')
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.OK)
  @ResponseType(DeleteChatUserResponse)
  async deleteChatUser(@Body() body: DeleteChatUserRequest) {
    return await this.chatManagementService.deleteChatUser(
      body.chatRoomId,
      body.chatUserId,
    );
  }

  @Delete('chat-message')
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.OK)
  @ResponseType(DeleteChatMessageResponse)
  async deleteChatMessage(@Body() body: DeleteChatMessageRequest) {
    return await this.chatManagementService.deleteChatMessage(
      body.chatRoomId,
      body.chatMessageId,
    );
  }
}
