import { Injectable } from '@nestjs/common';
import { CreateUserUseCase } from 'src/domains/user/use-cases/create-user.use-case';
import { UserType } from 'src/domains/user/model/vo/user-type.vo';
import { AuthService } from 'src/shared/modules/auth/auth.service';
import { GetUserByIdUseCase } from 'src/domains/user/use-cases/get-user-by-id.use-case';
import { GetUserByEmailUseCase } from 'src/domains/user/use-cases/get-user-by-email.use-case';
import { CryptoService } from 'src/shared/modules/crypto/crypto.service';
import { Response } from 'express';
import { TokenType } from 'src/shared/modules/auth/auth.constant';
import { User } from 'src/domains/user/model/entity/user.entity';
import { InvalidUserPasswordException } from './exceptions/invalid-user-password.exception';
import { GetExistenceByEmailUseCase } from 'src/domains/user/use-cases/get-existence-by-email.use-case';
import { Time } from 'src/shared/constants/time';
import { InvalidEmailOtpException } from 'src/shared/modules/auth/exceptions/invalid-email-otp';

@Injectable()
export class UserManagementService {
  constructor(
    private readonly authService: AuthService,
    private readonly cryptoService: CryptoService,
    private readonly createUserUseCase: CreateUserUseCase,
    private readonly getUserByIdUseCase: GetUserByIdUseCase,
    private readonly getUserByEmailUseCase: GetUserByEmailUseCase,
    private readonly getExistenceByEmailUseCase: GetExistenceByEmailUseCase,
  ) {}

  async signin({ email, password }: { email: string; password: string }) {
    const user = await this.getUserByEmailUseCase.execute(email);
    this.verifyPassword({ password, user });
    return await this.generateTokens(user);
  }

  async reissueByUserId(userId: number) {
    const user = await this.getUserByIdUseCase.execute(userId);
    return await this.generateTokens(user);
  }

  private async generateTokens(user: User) {
    const [access_token, refresh_token] = await Promise.all([
      this.authService.generateToken({
        payload: user,
        tokenType: TokenType.ACCESS_TOKEN,
      }),
      this.authService.generateToken({
        payload: user,
        tokenType: TokenType.REFRESH_TOKEN,
      }),
    ]);
    return { access_token, refresh_token };
  }

  async register({
    email,
    name,
    password,
    verificationToken,
  }: Pick<User, 'email' | 'name' | 'password'> & {
    verificationToken: string;
  }) {
    await this.checkEmailVerificationToken(email, verificationToken);
    const hashedPassword = this.hashPassword(password);
    return await this.createUserUseCase.execute({
      email,
      name,
      type: UserType.USER,
      password: hashedPassword,
    });
  }

  async checkEmailVerificationToken(email: string, verificationToken: string) {
    const { email: verifiedEmail } =
      this.authService.decodeVerificationToken(verificationToken);
    if (verifiedEmail !== email) throw new InvalidEmailOtpException();
  }

  async getUserById(id: number) {
    return await this.getUserByIdUseCase.execute(id);
  }

  async saveTest() {
    return await this.createUserUseCase.execute({
      email: 'test@test.com',
      name: 'test',
      type: UserType.USER,
      password: 'test',
    });
  }

  // async updateUser({ id, user }: { id: number; user: Partial<User> }) {
  //   return await this.updateUserUseCase.execute(id, user);
  // }

  packageToken({
    res,
    token,
    type,
  }: {
    res: Response;
    token: string;
    type: TokenType;
  }) {
    if (type === TokenType.ACCESS_TOKEN) {
      res.cookie(type, token, {
        secure: false,
        httpOnly: true,
        maxAge: Time.TEN_MINUTE,
      });
    }
    if (type === TokenType.REFRESH_TOKEN) {
      res.cookie(type, token, {
        secure: false,
        path: '/user-management/reissue',
        httpOnly: true,
        maxAge: Time.WEEK,
      });
    }
  }

  async getEmailDuplication(email: string) {
    return await this.getExistenceByEmailUseCase.execute(email);
  }

  private verifyPassword({ password, user }: { password: string; user: User }) {
    if (
      !this.cryptoService.compare({ origin: password, target: user.password })
    ) {
      throw new InvalidUserPasswordException();
    }
  }

  private hashPassword(password: string): string {
    return this.cryptoService.hash(password);
  }
}
