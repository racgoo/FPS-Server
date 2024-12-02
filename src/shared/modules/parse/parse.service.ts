import { Injectable } from '@nestjs/common';

@Injectable()
export class ParseService {
  public parseCookies(stringCookie: string) {
    try {
      return stringCookie.split(';').reduce((acc, cookie) => {
        const [key, value] = cookie.trim().split('=');
        acc[key] = value;
        return acc;
      }, {});
    } catch {
      return null;
    }
  }
}
