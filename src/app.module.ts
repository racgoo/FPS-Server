import { MiddlewareConsumer, Module } from '@nestjs/common';
import { UserDomainModule } from './domains/user/user.domain.module';
import { PaymentDomainModule } from './domains/payment/payment.domain.module';
import { UserManagementModule } from './adapters/driving/http/user-management/user-management.module';
import { AuthModule } from './shared/modules/auth/auth.module';
import { CryptoModule } from './shared/modules/crypto/crypto.module';
import { PaymentManagementModule } from './adapters/driving/http/payment-management/payment-management.module';
import { SqliteModule } from './persistent/sqlite/sqlite.module';
import { EnvModule } from './shared/modules/env/env.module';
import { LogModule } from './shared/modules/log/log.module';
import { RedisModule } from './adapters/driven/redis/redis.modue';
import { SocketModule } from './adapters/driving/socket/socket.module';
import { ChannelManagementModule } from './adapters/driving/http/channel/channel-management.module';
import { LogMiddleware } from './shared/middleware/log.middleware';
import { EmailModule } from './adapters/driven/email/email.modue';

//SHARED MODULES
const sharedModules = [AuthModule, CryptoModule, EnvModule, LogModule];

//DRIVEN ADAPTER MODULES ( Domain use this modules with adapter pattern )
const drivenAdapterModules = [SqliteModule, RedisModule, EmailModule];

//DRIVING ADAPTER MODULES ( This use domain modules with adapter pattern )
const drivingAdapterModules = [
  UserManagementModule,
  PaymentManagementModule,
  ChannelManagementModule,
  SocketModule,
];

//ADAPTER MODULES ( Driving Adapter, Driven Adapter )
const adapterModules = [...drivenAdapterModules, ...drivingAdapterModules];

//DOMAIN MODULES
const domainModules = [UserDomainModule, PaymentDomainModule];

@Module({
  imports: [...domainModules, ...adapterModules, ...sharedModules],
  controllers: [],
  providers: [],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LogMiddleware).forRoutes('*');
  }
}
