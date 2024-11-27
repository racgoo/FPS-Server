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

  getRandomOtp(): string {
    const seedString = Math.floor(Math.random() * 10000000000).toString();
    const hashedSeed = this.hash(seedString);
    const hashNumbers = Array.from(hashedSeed).map((char) =>
      char.charCodeAt(0),
    );
    const randomOtp = this.suffleArray(hashNumbers, 10)
      .splice(0, 5)
      .map((number) => number % 10)
      .join('');
    return randomOtp;
  }

  private suffleArray(array: any[], round: number) {
    let newArray = array.slice();
    for (let i = 0; i < round; i++) {
      newArray = newArray.sort(() => Math.random() - 0.5);
    }
    return newArray;
  }
}
