import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { TokenType } from '@shared/modules/auth/auth.constant';
import { TokenData } from '@shared/modules/auth/auth.interface';
import { AuthService } from '@shared/modules/auth/auth.service';
import { Injectable } from '@nestjs/common';
import SocketService from './socket.service';

@Injectable()
export abstract class BaseGateway
  implements OnGatewayConnection, OnGatewayDisconnect
{
  constructor(
    protected readonly authService: AuthService,
    protected readonly socketService: SocketService,
  ) {}

  @WebSocketServer()
  protected server: Server;

  afterInit() {
    this.socketService.setServer(this.server);
  }

  async handleConnection(client: Socket) {
    const tokenData = this.getTokenData(client);
    if (!tokenData || tokenData.tokenType !== TokenType.ACCESS_TOKEN) {
      client.disconnect(true);
      return;
    }
    const userId = tokenData.payload.id;
    this.socketService.addSocket(userId, client);
  }

  async handleDisconnect(client: Socket): Promise<void> {
    this.socketService.removeSocket(client);
  }

  private getTokenData(client: Socket): TokenData | null {
    const token = this.socketService.getConnectionToken(client);
    if (!token) return null;
    try {
      return this.authService.decodeToken(token);
    } catch {
      return null;
    }
  }

  private getUserId(client: Socket): number {
    return this.socketService.getSocketUser(client.id);
  }
}
