import { Injectable } from '@nestjs/common';

@Injectable()
export class ParseService {
  public parseCookies(stringCookie: string) {
    return stringCookie.split(';').reduce((acc, cookie) => {
      const [key, value] = cookie.trim().split('=');
      acc[key] = value;
      return acc;
    }, {});
  }
}
