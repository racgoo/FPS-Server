import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';

import { AuthService } from './auth.service';
import { JwtStrategy } from './strategies/jwt.strategy';
import { PassportModule } from '@nestjs/passport';
import { EnvModule } from '../env/env.module';
import { EnvService } from '../env/env.service';
import { EmailModule } from 'src/adapters/driven/email/email.modue';
import { CryptoModule } from '../crypto/crypto.module';
import { RedisModule } from 'src/adapters/driven/redis/redis.modue';

@Module({
  imports: [
    PassportModule,
    EmailModule,
    CryptoModule,
    EnvModule,
    RedisModule,
    JwtModule.registerAsync({
      useFactory: async (envService: EnvService) => {
        return {
          secret: envService.get('JWT_SECRET'),
        };
      },
      inject: [EnvService],
    }),
  ],
  providers: [AuthService, JwtStrategy],
  exports: [AuthService, JwtStrategy],
})
export class AuthModule {}
