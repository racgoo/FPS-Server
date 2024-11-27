import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
  Res,
  UseGuards,
} from '@nestjs/common';
import { UserManagementService } from './user-management.service';
import { RegisterRequest, RegisterResponse } from './dto/register.dto';
import { GetUserRequset, GetUserResponse } from './dto/get-user.dto';
import { ResponseType } from 'src/shared/decorators/response-type.decorator';
import { JwtAuthGuard } from 'src/shared/guards/jwt-auth.guard';
import { SigninRequest, SigninResponse } from './dto/signin.dto';
import { Response } from 'express';
import { RoleGuard } from 'src/shared/guards/role-auth.guard';
import { Roles } from 'src/shared/decorators/role.decorator';
import { UserType } from 'src/domains/user/model/vo/user-type.vo';
import { TokenType } from 'src/shared/modules/auth/auth.constant';
import { ReissueResponse } from './dto/reissue.dto';
import { JwtTokenTypes } from 'src/shared/decorators/jwt-token.decorator.guard';
import { GetTokenData } from 'src/shared/decorators/get-user.decorator';
import { TokenData } from 'src/shared/modules/auth/auth.interface';
import { UpdateUserRequest, UpdateUserResponse } from './dto/update-user.dto';
import { EnvService } from 'src/shared/modules/env/env.service';
import {
  EmailDuplicationRequest,
  EmailDuplicationResponse,
} from './dto/email-duplication.dto';
import { AuthService } from 'src/shared/modules/auth/auth.service';
import {
  EmailAuthenticationRequest,
  EmailAuthenticationResponse,
} from './dto/email-authentication.dto';
import {
  EmailVerificationRequest,
  EmailVerificationResponse,
} from './dto/email-verification.dto';
// import { JwtTokens } from 'src/shared/decorators/jwt-token.decorator.guard';

@Controller('user-management')
export class UserManagementController {
  constructor(
    private readonly userManagementService: UserManagementService,
    private readonly envService: EnvService,
    private readonly authService: AuthService,
  ) {}

  @Post('signin')
  @HttpCode(HttpStatus.OK)
  @ResponseType(SigninResponse)
  async signin(
    @Body() body: SigninRequest,
    @Res({ passthrough: true }) res: Response,
  ) {
    const { access_token, refresh_token } =
      await this.userManagementService.signin(body);
    this.userManagementService.packageToken({
      res,
      token: access_token,
      type: TokenType.ACCESS_TOKEN,
    });
    this.userManagementService.packageToken({
      res,
      token: refresh_token,
      type: TokenType.REFRESH_TOKEN,
    });
    return {};
  }

  @Get('reissue')
  @UseGuards(JwtAuthGuard)
  @JwtTokenTypes(TokenType.REFRESH_TOKEN)
  @HttpCode(HttpStatus.OK)
  @ResponseType(ReissueResponse)
  async signInByRefreshToken(
    @Res({ passthrough: true }) res: Response,
    @GetTokenData() tokenData: TokenData,
  ) {
    const { access_token, refresh_token } =
      await this.userManagementService.reissueByUserId(tokenData.payload.id);
    this.userManagementService.packageToken({
      res,
      token: access_token,
      type: TokenType.ACCESS_TOKEN,
    });
    this.userManagementService.packageToken({
      res,
      token: refresh_token,
      type: TokenType.REFRESH_TOKEN,
    });
    return {};
  }

  @Post('signup')
  @HttpCode(HttpStatus.OK)
  @ResponseType(RegisterResponse)
  async register(@Body() body: RegisterRequest) {
    await this.userManagementService.register(body);
    return {};
  }

  @Get('user/:id')
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Roles(UserType.USER)
  @HttpCode(HttpStatus.OK)
  @ResponseType(GetUserResponse)
  async getUser(@Param() params: GetUserRequset) {
    return { user: await this.userManagementService.getUserById(params.id) };
  }

  // @Put('user')
  // @UseGuards(JwtAuthGuard, RoleGuard)
  // @Roles(UserType.USER)
  // @ResponseType(UpdateUserResponse)
  // async updateUser(
  //   @Body() body: UpdateUserRequest,
  //   @GetTokenData() tokenData: TokenData,
  // ) {
  //   return (
  //     (await this.userManagementService.updateUser({
  //       id: tokenData.payload.id,
  //       user: body,
  //     })) || {}
  //   );
  // }

  @Post('email-duplication')
  @HttpCode(HttpStatus.OK)
  @ResponseType(EmailDuplicationResponse)
  async emailDuplication(@Body() body: EmailDuplicationRequest) {
    return {
      isDuplicated: await this.userManagementService.getEmailDuplication(
        body.email,
      ),
    };
  }

  @Post('email-authentication')
  @HttpCode(HttpStatus.OK)
  @ResponseType(EmailAuthenticationResponse)
  async emailAuthentication(@Body() body: EmailAuthenticationRequest) {
    return await this.authService.generateEmailAuthentication(body.email);
  }

  @Post('email-verification')
  @HttpCode(HttpStatus.OK)
  @ResponseType(EmailVerificationResponse)
  async emailVerification(@Body() body: EmailVerificationRequest) {
    return await this.authService.verifyEmailAuthentication(
      body.email,
      body.code,
    );
  }
}
