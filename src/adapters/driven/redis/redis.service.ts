import { Injectable } from '@nestjs/common';
import { createClient, RedisClientType } from 'redis';
import { EnvService } from 'src/shared/modules/env/env.service';

@Injectable()
export class RedisService {
  private redisClient: RedisClientType;
  constructor(private readonly envService: EnvService) {
    if (this.envService.get('NODE_ENV') === 'production') {
      this.redisClient = createClient({
        url: this.envService.get('REDIS_URL'),
        password: this.envService.get('REDIS_PASSWORD'),
      });
    } else {
      this.redisClient = createClient({
        url: this.envService.get('REDIS_URL'),
      });
    }
  }

  async connect() {
    await this.redisClient.connect();
  }

  async getJsonData<T>(key: string): Promise<T> {
    const rawData = await this.redisClient.get(key);
    return rawData ? (JSON.parse(rawData) as T) : null;
  }

  async setJsonData<T>(key: string, value: T, expirationMils?: number) {
    const expirationSeconds = expirationMils
      ? expirationMils / 1000
      : undefined;
    return this.redisClient.set(key, JSON.stringify(value), {
      ...(expirationSeconds && { EX: expirationSeconds }),
    });
  }
}
