import { ChatUser } from './chat-user.entity';

export class ChatMessage {
  id?: number;
  content: string;
  user: ChatUser;
  createdAt?: Date;
  updatedAt?: Date;
}
