import {
  CustomException,
  DEFAULT_EXCEPTION_STATUS,
} from 'src/shared/exceptions/default-exception';
import { AuthErrorCode } from '../auth.constant';

const { DOMAIN_PREFIX, INVALID_TOKEN } = AuthErrorCode;
export class InvalidTokenException extends CustomException {
  readonly status = DEFAULT_EXCEPTION_STATUS.UNAUTHORIZED;
  readonly code = DOMAIN_PREFIX + INVALID_TOKEN;
  readonly message = '잘못된 토큰입니다.';
}
