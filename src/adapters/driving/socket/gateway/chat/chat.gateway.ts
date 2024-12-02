import { SubscribeMessage, WebSocketGateway } from '@nestjs/websockets';
import { Socket } from 'socket.io';
import { AuthService } from '@shared/modules/auth/auth.service';
import SocketService from '../../socket.service';
import { BaseGateway } from '../../base.gateway';
import { ChannelMessageDrivingDto } from './dto/driving/channel-message.dto';
import { ChannelMessageDrivenDto } from './dto/driven/channel-message.dto';
import { GetUserByIdUseCase } from '@domains/user/use-cases/get-user-by-id.use-case';

@WebSocketGateway(parseInt(process.env.WS_PORT))
export class ChatGateway extends BaseGateway {
  constructor(
    protected readonly authService: AuthService,
    protected readonly socketService: SocketService,
    private readonly getUserByIdUseCase: GetUserByIdUseCase,
  ) {
    super(authService, socketService);
  }

  //   @SubscribeMessage('chat:join')
  //   async handleJoinRoom(client: Socket, payload: { roomId: number }) {
  //     const room = `chat:${payload.roomId}`;
  //     await client.join(room);
  //     this.socketService.addToRoom(room, client.id);

  //     // 현재 방에 있는 모든 사용자에게 새 사용자 입장을 알림
  //     const users = this.socketService.getRoomUsers(room);
  //     this.socketService.broadcastToRoom(room, 'chat:userJoined', {
  //       userId: this.getUserId(client),
  //       users,
  //     });
  //   }

  @SubscribeMessage(ChannelMessageDrivingDto.endPoint)
  async handleChannelMessage(
    client: Socket,
    payload: ChannelMessageDrivingDto,
  ) {
    console.log('handleChannelMessage', payload);
    const sender_id = this.socketService.getSocketUser(client.id);
    const sender = await this.getUserByIdUseCase.execute(sender_id);
    this.socketService.broadcastToAll<ChannelMessageDrivenDto>(
      ChannelMessageDrivenDto.endPoint,
      {
        ...payload,
        name: sender.name,
      },
    );
  }

  //   @SubscribeMessage('chat:message')
  //   async handleMessage(
  //     client: Socket,
  //     payload: { roomId: number; content: string },
  //   ) {
  //     const userId = this.getUserId(client);
  //     const room = `chat:${payload.roomId}`;

  //     this.socketService.broadcastToRoom(room, 'chat:message', {
  //       userId,
  //       content: payload.content,
  //       timestamp: new Date(),
  //     });
  //   }
}
