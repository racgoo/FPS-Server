import { UserType } from '../vo/user-type.vo';
import { ChatMessage } from './chat-message.entity';
import { ChatUser } from './chat-user.entity';

interface ChatAggregate {
  addChatMessage(chatMessage: ChatMessage): ChatMessage;
  deleteChatMessage(chatMessageId: number): void;
  addChatUser(chatUser: ChatUser): ChatUser;
  deleteChatUser(chatUserId: number): void;
}

//Aggregate Root
export class ChatRoom implements ChatAggregate {
  id?: number;
  name: string;
  chatMessages: ChatMessage[];
  users: ChatUser[];
  createdAt?: Date;
  updatedAt?: Date;

  constructor() {
    this.chatMessages = [];
    this.users = [];
  }

  addChatMessage({ content, user }: { content: string; user: ChatUser }) {
    const chatMessage = new ChatMessage();
    chatMessage.content = content;
    chatMessage.user = user;
    this.chatMessages.push(chatMessage);
    return chatMessage;
  }

  deleteChatMessage(chatMessageId: number) {
    this.chatMessages = this.chatMessages.filter(
      (message) => message.id !== chatMessageId,
    );
  }

  addChatUser({
    id,
    name,
    email,
    password,
    type,
  }: {
    id?: number;
    name: string;
    email: string;
    password: string;
    type: UserType;
  }) {
    const chatUser = new ChatUser();
    chatUser.id = id;
    chatUser.name = name;
    chatUser.email = email;
    chatUser.password = password;
    chatUser.type = type;
    chatUser.createdAt = new Date();
    chatUser.updatedAt = new Date();
    this.users.push(chatUser);
    return chatUser;
  }

  deleteChatUser(chatUserId: number) {
    this.users = this.users.filter((user) => user.id !== chatUserId);
  }
}
