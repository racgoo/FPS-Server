import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { EnvSchema } from './env.schema';

@Injectable()
export class EnvService {
  constructor(private readonly configService: ConfigService) {}
  get<T extends keyof EnvSchema>(key: T): EnvSchema[T] {
    return this.configService.get(key);
  }
}
