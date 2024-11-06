import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface ResponseFormat {
  status: number;
  code: string;
  message: string;
  data: any;
}

@Injectable()
export class ResponseFormatterInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      map((data): ResponseFormat => {
        return {
          status: 200,
          code: '',
          message: 'Success',
          data: data || null,
        };
      }),
    );
  }
}
