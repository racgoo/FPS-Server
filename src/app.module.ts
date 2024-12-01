import { MiddlewareConsumer, Module } from '@nestjs/common';
import { UserDomainModule } from '@domains/user/user.domain.module';
import { AuthModule } from '@shared/modules/auth/auth.module';
import { CryptoModule } from '@shared/modules/crypto/crypto.module';
import { EnvModule } from '@shared/modules/env/env.module';
import { LogModule } from '@shared/modules/log/log.module';
import { RedisModule } from '@adapters/driven/redis/redis.modue';
import { SocketModule } from '@adapters/driving/socket/socket.module';
import { LogMiddleware } from '@shared/middleware/log.middleware';
import { EmailModule } from '@adapters/driven/email/email.modue';
import { SqliteModule } from '@adapters/driven/sqlite/sqlite.module';
import { ChatDomainModule } from '@domains/chat/chat.domain.module';
import { HttpModule } from '@adapters/driving/http/http.module';
import { ParseModule } from '@shared/modules/parse/parse.module';

//SHARED MODULES
const sharedModules = [
  AuthModule,
  CryptoModule,
  ParseModule,
  EnvModule,
  LogModule,
];

//DRIVEN ADAPTER MODULES ( Domain use this modules with adapter pattern )
const drivenAdapterModules = [SqliteModule, RedisModule, EmailModule];

//DRIVING ADAPTER MODULES ( This use domain modules with adapter pattern )
const drivingAdapterModules = [SocketModule, HttpModule];

//ADAPTER MODULES ( Driving Adapter, Driven Adapter )
const adapterModules = [...drivenAdapterModules, ...drivingAdapterModules];

//DOMAIN MODULES
const domainModules = [UserDomainModule, ChatDomainModule];

@Module({
  imports: [...domainModules, ...adapterModules, ...sharedModules],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LogMiddleware).forRoutes('*');
  }
}
