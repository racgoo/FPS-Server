import { UserType } from '../vo/user-type.vo';

//Aggregate Root
export class User {
  id: number;
  name: string;
  email: string;
  password: string;
  type: UserType;
  createdAt: Date;
  updatedAt: Date;
}
