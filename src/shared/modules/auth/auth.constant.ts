export enum AuthErrorCode {
  DOMAIN_PREFIX = 'S01',
  UNAUTHORIZED = '001',
  EXPIRED_ACCESS_TOKEN = '002',
  EXPIRED_REFRESH_TOKEN = '003',
  INVALID_TOKEN = '004',
  FORBIDDEN = '005',
}

export enum TokenType {
  ACCESS_TOKEN = 'access_token',
  REFRESH_TOKEN = 'refresh_token',
}

export enum TokenExpireTime {
  ACCESS_TOKEN = '1m',
  REFRESH_TOKEN = '1s',
}
