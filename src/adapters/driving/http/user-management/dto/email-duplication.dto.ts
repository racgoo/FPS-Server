import { Expose } from 'class-transformer';
import { IsBoolean, IsEmail } from 'class-validator';

export class EmailDuplicationRequest {
  @IsEmail()
  email: string;
}

export class EmailDuplicationResponse {
  @Expose()
  @IsBoolean()
  isDuplicated: boolean;
}
