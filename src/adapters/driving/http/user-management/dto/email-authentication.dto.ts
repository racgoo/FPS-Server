import { Expose } from 'class-transformer';
import { IsEmail } from 'class-validator';

export class EmailAuthenticationRequest {
  @IsEmail()
  email: string;
}

export class EmailAuthenticationResponse {
  @Expose()
  expireTime: number;
}
