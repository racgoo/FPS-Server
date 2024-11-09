import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { TokenType } from 'src/shared/modules/auth/auth.constant';
import { TokenData } from 'src/shared/modules/auth/auth.interface';
import { AuthService } from 'src/shared/modules/auth/auth.service';

@WebSocketGateway(parseInt(process.env.WS_PORT))
export class SocketGateway implements OnGatewayConnection, OnGatewayDisconnect {
  constructor(private readonly authService: AuthService) {}
  @WebSocketServer()
  server: Server;
  private connectedSocketMap: { [socketId: string]: boolean } = {};
  private userIdMap: { [socketId: string]: number } = {};
  private roomUsers: { [key: string]: string[] } = {};

  async handleConnection(client: Socket): Promise<void> {
    const tokenData = this.getTokenData(client);
    if (!tokenData || tokenData.tokenType !== TokenType.ACCESS_TOKEN) {
      client.disconnect(true);
      return;
    }
    this.connectedSocketMap[client.id] = true;
    this.userIdMap[client.id] = tokenData.payload.id;
  }

  async handleDisconnect(client: Socket): Promise<void> {
    delete this.connectedSocketMap[client.id];
    delete this.userIdMap[client.id];
  }

  private getTokenData(client: Socket): TokenData | null {
    const token = client.handshake.auth.token;
    if (!token) return null;
    try {
      return this.authService.verifyToken(token);
    } catch {
      return null;
    }
  }

  @SubscribeMessage('message')
  handleMessage(client: Socket, payload: any): string {
    // console.log('handleMessage', client, payload);
    return 'Hello world!';
  }

  @SubscribeMessage('file')
  handleFile(client: Socket, payload: any): string {
    // console.log('handleMessage', client, payload);
    return 'Hello world!';
  }
}
