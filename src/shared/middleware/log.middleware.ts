import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import { LogService } from '../modules/log/log.service';
import { ResponseFormat } from '../interceptors/reponse-formatter.interceptor';

@Injectable()
export class LogMiddleware implements NestMiddleware {
  constructor(private readonly logService: LogService) {}

  use(request: Request, response: Response, next: NextFunction) {
    const originalJson = response.json;
    const originalSend = response.send;

    let rawResponseBody: string;
    // json 메소드 래핑
    response.json = function (body: string): Response {
      rawResponseBody = body;
      return originalJson.call(this, body);
    };

    // send 메소드 래핑
    response.send = function (body: string): Response {
      rawResponseBody = body;
      return originalSend.call(this, body);
    };

    response.on('finish', () => {
      const responseBody: ResponseFormat = JSON.parse(rawResponseBody);
      const requestContext = {
        path: request.url,
        method: request.method,
        headers: request.headers,
        body: request.body,
        query: request.query,
        params: request.params,
      };
      if (responseBody.status < 300) {
        this.logService.create({
          request: JSON.stringify(requestContext),
          detail: JSON.stringify(responseBody),
        });
      }
    });
    next();
  }
}
