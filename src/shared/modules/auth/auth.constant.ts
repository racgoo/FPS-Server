export enum AuthErrorCode {
  DOMAIN_PREFIX = 'S01',
  INVALID_TOKEN = '001',
  EXPIRED_TOKEN = '002',
  UNAUTHORIZED = '003',
  FORBIDDEN = '004',
}

export enum TokenType {
  ACCESS_TOKEN = 'access_token',
  REFRESH_TOKEN = 'refresh_token',
}

export enum TokenExpireTime {
  ACCESS_TOKEN = '1m',
  REFRESH_TOKEN = '7d',
}
