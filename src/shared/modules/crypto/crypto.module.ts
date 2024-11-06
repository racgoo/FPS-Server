import { Module } from '@nestjs/common';
import { CryptoService } from './crypto.service';
import { EnvModule } from '../env/env.module';

@Module({
  imports: [EnvModule],
  providers: [CryptoService],
  exports: [CryptoService],
})
export class CryptoModule {}
