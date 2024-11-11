import { NestFactory, Reflector } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import * as cookieParser from 'cookie-parser';
import { AppModule } from './app.module';
import { JsendExceptionFilter } from './shared/filters/exception.filter';
import { ResponseSerializeInterceptor } from './shared/interceptors/response-serialize.interceptor';
import { ResponseFormatterInterceptor } from './shared/interceptors/reponse-formatter.interceptor';
import { EnvService } from './shared/modules/env/env.service';
import { LogService } from './shared/modules/log/log.service';
import { RedisIoAdapter } from './adapters/driven/redis/redis.io-adapter';

async function bootstrap() {
  //INIT APP
  const app = await NestFactory.create(AppModule);

  //CORS
  app.enableCors({
    origin: true,
    credentials: true,
    exposedHeaders: ['Authorization', 'Cookie'],
  });

  //GET GLOBALOG SERVICE
  const logService = app.get(LogService);

  //REDIS BIND CLIENT CONNECT
  const redisIoAdapter = app.get(RedisIoAdapter);
  await redisIoAdapter.connectToRedis();

  //SETUP REDIS WEBSOCKET ADAPTER
  app.useWebSocketAdapter(redisIoAdapter);

  //COOKIE HANDLER
  app.use(cookieParser());

  //VALIDATION PIPE
  app.useGlobalPipes(new ValidationPipe({ transform: true }));

  //INTERCEPTORS
  app.useGlobalInterceptors(
    //RESPONSE FORMATTER ( Common Response -> Jsend Response )
    new ResponseFormatterInterceptor(),
    //RESPONSE SERIALIZER ( Exclude Unset Fields )
    new ResponseSerializeInterceptor(app.get(Reflector)),
  );

  //EXCEPTION FILTER
  app.useGlobalFilters(new JsendExceptionFilter(logService));

  //SERVER LISTENER
  const envService = app.get(EnvService);
  const wasPort = envService.get('WAS_PORT');
  await app.listen(wasPort);
}
bootstrap();
