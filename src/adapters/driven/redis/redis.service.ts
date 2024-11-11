import { Injectable } from '@nestjs/common';
import Redis from 'ioredis';
import Redlock from 'redlock';
import { EnvService } from 'src/shared/modules/env/env.service';

@Injectable()
export class RedisService {
  private redisClient: Redis;
  private redisLock: Redlock;

  constructor(private readonly envService: EnvService) {
    if (this.envService.get('NODE_ENV') === 'production') {
      this.redisClient = new Redis({
        host: this.envService.get('REDIS_HOST'),
        port: this.envService.get('REDIS_PORT'),
        password: this.envService.get('REDIS_PASSWORD'),
      });
    } else {
      this.redisClient = new Redis({
        host: this.envService.get('REDIS_HOST'),
        port: this.envService.get('REDIS_PORT'),
      });
    }

    this.redisLock = new Redlock([this.redisClient], {
      driftFactor: 0.01,
      retryCount: 10,
      retryDelay: 200,
      retryJitter: 200,
      automaticExtensionThreshold: 500,
    });
  }

  async getJsonData<T>(key: string): Promise<T> {
    const rawData = await this.redisClient.get(key);
    return rawData ? (JSON.parse(rawData) as T) : null;
  }

  async setJsonData<T>(key: string, value: T, expirationMils?: number) {
    const jsonValue = JSON.stringify(value);
    if (expirationMils) {
      return this.redisClient.set(key, jsonValue, 'PX', expirationMils);
    }
    return this.redisClient.set(key, jsonValue);
  }

  async deleteData(key: string) {
    return await this.redisClient.del(key);
  }

  async executeWithLock<T>(
    key: string,
    callback: () => Promise<T>,
  ): Promise<T> {
    const prefixedKey = `redis:lock:${key}`;
    return await this.redisLock.using([prefixedKey], 1000, callback);
  }
}
