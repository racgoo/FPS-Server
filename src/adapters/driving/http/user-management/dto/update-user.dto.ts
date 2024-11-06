import {} from 'class-transformer';
import { IsString } from 'class-validator';
import { UserDto } from './user.dto';

export class UpdateUserRequest {
  @IsString()
  name?: string;
  @IsString()
  email?: string;
}

export class UpdateUserResponse {
  user: UserDto;
}
