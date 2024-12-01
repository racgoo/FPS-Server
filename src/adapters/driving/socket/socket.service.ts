import { Injectable } from '@nestjs/common';
import { TokenType } from '@shared/modules/auth/auth.constant';
import { ParseService } from '@shared/modules/parse/parse.service';
import { Server, Socket } from 'socket.io';

@Injectable()
class SocketService {
  private connectedSockets: Map<string, Socket> = new Map();
  private userSocketMap: Map<number, Set<string>> = new Map();
  private socketUserMap: Map<string, number> = new Map();
  private roomUsers: Map<string, Set<string>> = new Map();
  private server: Server;

  constructor(private readonly parseService: ParseService) {}

  setServer(server: Server) {
    this.server = server;
  }

  addSocket(userId: number, socket: Socket) {
    this.connectedSockets.set(socket.id, socket);
    this.socketUserMap.set(socket.id, userId);

    if (!this.userSocketMap.has(userId)) {
      this.userSocketMap.set(userId, new Set());
    }
    this.userSocketMap.get(userId).add(socket.id);
  }

  removeSocket(socket: Socket) {
    const userId = this.socketUserMap.get(socket.id);
    if (userId) {
      const userSockets = this.userSocketMap.get(userId);
      userSockets?.delete(socket.id);
      if (userSockets?.size === 0) {
        this.userSocketMap.delete(userId);
      }
    }

    this.socketUserMap.delete(socket.id);
    this.connectedSockets.delete(socket.id);

    // Remove from all rooms
    this.roomUsers.forEach((sockets) => {
      sockets.delete(socket.id);
    });
  }

  getUserSockets(userId: number): Socket[] {
    const socketIds = this.userSocketMap.get(userId);
    if (!socketIds) return [];
    return Array.from(socketIds)
      .map((id) => this.connectedSockets.get(id))
      .filter((socket) => socket);
  }

  getSocketUser(socketId: string): number | undefined {
    return this.socketUserMap.get(socketId);
  }

  addToRoom(room: string, socketId: string) {
    if (!this.roomUsers.has(room)) {
      this.roomUsers.set(room, new Set());
    }
    this.roomUsers.get(room).add(socketId);
  }

  removeFromRoom(room: string, socketId: string) {
    this.roomUsers.get(room)?.delete(socketId);
    if (this.roomUsers.get(room)?.size === 0) {
      this.roomUsers.delete(room);
    }
  }

  getRoomUsers(room: string): number[] {
    const socketIds = this.roomUsers.get(room) || new Set();
    return Array.from(socketIds)
      .map((socketId) => this.socketUserMap.get(socketId))
      .filter((userId) => userId !== undefined);
  }

  broadcastToAll<T>(event: string, data: T) {
    this.server.emit(event, data);
  }

  broadcastToUser(userId: number, event: string, data: any) {
    const sockets = this.getUserSockets(userId);
    sockets.forEach((socket) => socket.emit(event, data));
  }

  broadcastToRoom(room: string, event: string, data: any) {
    this.server.to(room).emit(event, data);
  }

  private getConnectionCookie(socket: Socket) {
    const cookies = socket.handshake.headers.cookie;
    return this.parseService.parseCookies(cookies);
  }

  getConnectionToken(socket: Socket) {
    const cookie = this.getConnectionCookie(socket);
    return cookie[TokenType.ACCESS_TOKEN];
  }
}

export default SocketService;
