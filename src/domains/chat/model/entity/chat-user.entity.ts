import { UserType } from '../vo/user-type.vo';

export class ChatUser {
  id: number;
  name: string;
  email: string;
  password: string;
  type: UserType;
  createdAt: Date;
  updatedAt: Date;
}
