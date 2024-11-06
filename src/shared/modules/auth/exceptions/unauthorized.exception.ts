import {
  CustomException,
  DEFAULT_EXCEPTION_STATUS,
} from 'src/shared/exceptions/default-exception';
import { AuthErrorCode } from '../auth.constant';

const { DOMAIN_PREFIX, UNAUTHORIZED } = AuthErrorCode;
export class UnauthorizedException extends CustomException {
  readonly status = DEFAULT_EXCEPTION_STATUS.UNAUTHORIZED;
  readonly code = DOMAIN_PREFIX + UNAUTHORIZED;
  readonly message = '인증이 필요합니다.';
}
