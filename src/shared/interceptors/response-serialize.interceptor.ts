import { Injectable, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ClassSerializerInterceptor } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { plainToClass } from 'class-transformer';
import { RESPONSE_TYPE_KEY } from '../decorators/response-type.decorator';

@Injectable()
export class ResponseSerializeInterceptor extends ClassSerializerInterceptor {
  constructor(reflector: Reflector) {
    super(reflector, { excludeExtraneousValues: true });
  }

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const responseType = this.reflector.get(
      RESPONSE_TYPE_KEY,
      context.getHandler(),
    );
    return next.handle().pipe(
      map((data) => {
        if (!data) return data;
        if (responseType) {
          if (Array.isArray(data)) {
            return data.map((item) =>
              plainToClass(responseType, item, {
                excludeExtraneousValues: true,
                exposeUnsetFields: false,
              }),
            );
          }
          return plainToClass(responseType, data, {
            excludeExtraneousValues: true,
            exposeUnsetFields: false,
          });
        }
        return data;
      }),
    );
  }
}
