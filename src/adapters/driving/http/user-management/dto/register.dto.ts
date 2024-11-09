import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class RegisterRequest {
  @IsEmail()
  @IsNotEmpty()
  email: string;
  @IsString()
  @IsNotEmpty()
  name: string;
  @IsString()
  @IsNotEmpty()
  @MinLength(8)
  password: string;
  @IsString()
  @IsNotEmpty()
  verificationToken: string;
}

export class RegisterResponse {}
