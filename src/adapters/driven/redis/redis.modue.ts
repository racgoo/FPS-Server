import { Module } from '@nestjs/common';
import { RedisIoAdapter } from './redis.io-adapter';

@Module({
  imports: [],
  providers: [RedisIoAdapter],
  exports: [RedisIoAdapter],
})
export class RedisModule {}
