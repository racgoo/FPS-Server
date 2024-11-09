import {
  ArgumentsHost,
  Catch,
  HttpException,
  ExceptionFilter,
} from '@nestjs/common';
import { CustomException } from '../exceptions/default-exception';
import { LogService } from '../modules/log/log.service';
import { TokenType } from '../modules/auth/auth.constant';
import { Response } from 'express';
import { ExpiredRefreshTokenException } from '../modules/auth/exceptions/expired-refresh-token.exception';

@Catch()
export class JsendExceptionFilter implements ExceptionFilter {
  constructor(private readonly logService: LogService) {}

  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response: Response = ctx.getResponse();
    const request = ctx.getRequest();

    // 요청 정보 수집
    const errorContext = {
      path: request.url,
      method: request.method,
      headers: request.headers,
      body: request.body,
      query: request.query,
      params: request.params,
    };

    // 스택 트레이스 추출
    const exceptionDetail = {
      name: exception instanceof Error ? exception.name : 'Unknown Error',
      message: exception instanceof Error ? exception.message : 'Unknown Error',
      stack: exception instanceof Error ? exception.stack : '스택 정보 없음',
    };

    this.logService.create({
      request: JSON.stringify(errorContext),
      detail: JSON.stringify(exceptionDetail),
    });

    if (exception instanceof HttpException) {
      return response.status(200).json({
        status: exception.getStatus(),
        code: '',
        message: exception.message,
        data: {},
      });
    }

    if (exception instanceof CustomException) {
      this.handleExceptionForCookie(response, exception);
      return response.status(200).json({
        status: exception.status,
        code: exception.code,
        message: exception.message,
        data: {},
      });
    }

    // 예상치 못한 에러의 경우
    response.status(500).json({
      status: 500,
      code: '',
      message: '서버 에러',
      data: {},
    });
  }

  //특정 예외에 대한 쿠키 삭제 처리
  private handleExceptionForCookie(response: Response, exception: any) {
    if (exception instanceof ExpiredRefreshTokenException) {
      response.clearCookie(TokenType.ACCESS_TOKEN, {
        secure: false,
        httpOnly: true,
      });
      response.clearCookie(TokenType.REFRESH_TOKEN, {
        httpOnly: true,
        secure: false,
        path: '/user-management/reissue',
      });
    }
  }
}
