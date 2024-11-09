import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { instanceToPlain } from 'class-transformer';
import { TokenData } from './auth.interface';
import { TokenExpireTime, TokenType } from './auth.constant';
import { EmailService } from 'src/adapters/driven/email/email.service';
import { CryptoService } from '../crypto/crypto.service';
import { RedisService } from 'src/adapters/driven/redis/redis.service';
import { Time } from 'src/shared/constants/time';
import { InvalidEmailOtpException } from './exceptions/invalid-email-otp';
import { NotFoundEmailOtpException } from './exceptions/not-found-email-otp.exception';

@Injectable()
export class AuthService {
  private readonly OTP_TRY_LIMIT = 5;
  private readonly OTP_EXPIRE_TIME = Time.MINUTE;
  private readonly OTP_VERIFICATION_TIME = Time.MINUTE;
  constructor(
    private readonly jwtService: JwtService,
    private readonly emailService: EmailService,
    private readonly cryptoService: CryptoService,
    private readonly redisService: RedisService,
  ) {}

  async generateToken(tokenData: TokenData) {
    const plain = instanceToPlain(tokenData);
    switch (tokenData.tokenType) {
      case TokenType.ACCESS_TOKEN:
        return this.jwtService.sign(plain, {
          expiresIn: TokenExpireTime.ACCESS_TOKEN,
        });
      case TokenType.REFRESH_TOKEN:
        return this.jwtService.sign(plain, {
          expiresIn: TokenExpireTime.REFRESH_TOKEN,
        });
    }
  }

  decodeToken(token: string) {
    return this.jwtService.verify(token);
  }

  async generateEmailAuthentication(email: string) {
    const randomOtp = this.cryptoService.getRandomOtp();
    this.sendOtpMail(email, randomOtp);
    return await this.setOtpToRedis(email, randomOtp);
  }

  async verifyEmailAuthentication(email: string, otp: string) {
    const storedOtp = await this.getOtpFromRedis(email);
    if (!storedOtp) throw new NotFoundEmailOtpException();
    if (storedOtp.otp !== otp) throw new InvalidEmailOtpException();
    const verificationToken = this.generateVerificationToken(email);
    return { verificationToken };
  }

  decodeVerificationToken(token: string) {
    try {
      return this.jwtService.verify<{ email: string }>(token);
    } catch {
      throw new InvalidEmailOtpException();
    }
  }

  private async sendOtpMail(email: string, otp: string) {
    return await this.emailService.sendOtpMail({
      email,
      otp,
    });
  }

  private getOtpKey(email: string) {
    return `email-verification-otp:${email}`;
  }

  private async setOtpToRedis(email: string, otp: string) {
    const otpKey = this.getOtpKey(email);
    await this.redisService.setJsonData(
      otpKey,
      {
        email,
        otp,
      },
      this.OTP_EXPIRE_TIME,
    );
    return { expireTime: this.OTP_EXPIRE_TIME };
  }

  private async getOtpFromRedis(email: string) {
    const otpKey = this.getOtpKey(email);
    return await this.redisService.getJsonData<{
      email: string;
      otp: string;
    }>(otpKey);
  }

  private generateVerificationToken(email: string) {
    return this.jwtService.sign(
      { email },
      { expiresIn: this.OTP_VERIFICATION_TIME },
    );
  }
}
