import {
  CustomException,
  DEFAULT_EXCEPTION_STATUS,
} from 'src/shared/exceptions/default-exception';
import { AuthErrorCode } from '../auth.constant';

const { DOMAIN_PREFIX, EXPIRED_ACCESS_TOKEN } = AuthErrorCode;
export class ExpiredAccessTokenException extends CustomException {
  readonly status = DEFAULT_EXCEPTION_STATUS.UNAUTHORIZED;
  readonly code = DOMAIN_PREFIX + EXPIRED_ACCESS_TOKEN;
  readonly message = '만료된 토큰입니다.';
}
