import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { EnvService } from '../env/env.service';
@Injectable()
export class CryptoService {
  constructor(private readonly envService: EnvService) {}

  hash(password: string): string {
    const saltRounds = this.envService.get('PASSWORD_HASH_SALT');
    return bcrypt.hashSync(password, saltRounds);
  }

  compare({ origin, target }: { origin: string; target: string }) {
    return bcrypt.compareSync(origin, target);
  }
}
