import { Expose } from 'class-transformer';
import { IsEmail, IsString } from 'class-validator';

export class EmailVerificationRequest {
  @IsEmail()
  email: string;
  @IsString()
  code: string;
}

export class EmailVerificationResponse {
  @Expose()
  verificationToken: string;
}
