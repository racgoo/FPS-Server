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
import { Otp } from './types/otp.type';
import { ExpiredEmailOtpException } from './exceptions/expired-email-otp.exception';

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

  async verifyEmailAuthentication(email: string, code: string) {
    return await this.redisService.executeWithLock(email, async () => {
      const storedOtp = await this.getOtpFromRedis(email);
      this.handleOtpExistence(storedOtp);
      await this.handleExpiredOtp(storedOtp);
      await this.handleOtpCodeVerification(storedOtp, code);
      const verificationToken = this.generateVerificationToken(email);
      return { verificationToken };
    });
  }

  private handleOtpExistence(storedOtp: Otp) {
    if (!storedOtp) throw new NotFoundEmailOtpException();
  }

  private async handleOtpCodeVerification(storedOtp: Otp, code: string) {
    if (storedOtp.code !== code) {
      await this.handleOtpRetryCountDecrease(storedOtp);
      throw new InvalidEmailOtpException(
        `코드가 일치하지 않습니다.\n${storedOtp.retryCount - 1}회 남았습니다.`,
      );
    }
  }

  private async handleOtpRetryCountDecrease(storedOtp: Otp) {
    storedOtp.retryCount -= 1;
    await this.setOtpToRedis(
      storedOtp.email,
      storedOtp.code,
      storedOtp.retryCount,
    );
  }

  private async handleExpiredOtp(storedOtp: Otp) {
    if (storedOtp.retryCount <= 0) {
      await this.redisService.deleteData(this.getOtpRedisKey(storedOtp.email));
      throw new ExpiredEmailOtpException(
        '인증 횟수를 초과하였습니다.\n코드를 다시 발급해주세요.',
      );
    }
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

  private getOtpRedisKey(email: string) {
    return `email-verification-otp:${email}`;
  }

  private async setOtpToRedis(
    email: string,
    code: string,
    retryCount?: number,
  ) {
    const otpKey = this.getOtpRedisKey(email);
    await this.redisService.setJsonData<Otp>(
      otpKey,
      {
        email,
        code,
        retryCount: retryCount ?? this.OTP_TRY_LIMIT,
      },
      this.OTP_EXPIRE_TIME,
    );
    return { expireTime: this.OTP_EXPIRE_TIME };
  }

  private async getOtpFromRedis(email: string) {
    const otpKey = this.getOtpRedisKey(email);
    return await this.redisService.getJsonData<Otp>(otpKey);
  }

  private generateVerificationToken(email: string) {
    return this.jwtService.sign(
      { email },
      { expiresIn: this.OTP_VERIFICATION_TIME },
    );
  }
}
