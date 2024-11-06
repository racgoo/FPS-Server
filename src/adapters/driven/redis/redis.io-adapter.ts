import { IoAdapter } from '@nestjs/platform-socket.io';
import { ServerOptions } from 'socket.io';
import { createAdapter } from '@socket.io/redis-adapter';
import { createClient } from 'redis';
import { Injectable } from '@nestjs/common';
import { EnvService } from 'src/shared/modules/env/env.service';

@Injectable()
export class RedisIoAdapter extends IoAdapter {
  private adapterConstructor: ReturnType<typeof createAdapter>;
  constructor(private readonly envService: EnvService) {
    super();
  }
  async connectToRedis(): Promise<void> {
    let pubClient;
    if (this.envService.get('NODE_ENV') === 'production') {
      pubClient = createClient({
        url: this.envService.get('REDIS_URL'),
        password: this.envService.get('REDIS_PASSWORD'),
      });
    } else {
      pubClient = createClient({
        url: this.envService.get('REDIS_URL'),
      });
    }

    const subClient = pubClient.duplicate();
    await Promise.all([pubClient.connect(), subClient.connect()]);
    this.adapterConstructor = createAdapter(pubClient, subClient);
  }

  createIOServer(port: number, options?: ServerOptions): any {
    const server = super.createIOServer(port, options);
    server.adapter(this.adapterConstructor);
    return server;
  }
}
