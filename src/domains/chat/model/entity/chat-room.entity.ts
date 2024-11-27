import { ChatMessage } from './chat-message.entity';
import { ChatUser } from './chat-user.entity';

//Aggregate Root
export class ChatRoom {
  id: number;
  name: string;
  chatMessages: ChatMessage[];
  chatUsers: ChatUser[];
  createdAt: Date;
  updatedAt: Date;
}
