import { Module } from '@nestjs/common';
import { RedisIoAdapter } from './redis.io-adapter';
import { RedisService } from './redis.service';

@Module({
  imports: [],
  providers: [RedisIoAdapter, RedisService],
  exports: [RedisIoAdapter, RedisService],
})
export class RedisModule {}
