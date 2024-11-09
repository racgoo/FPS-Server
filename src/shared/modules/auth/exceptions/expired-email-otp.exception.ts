import {
  CustomException,
  DEFAULT_EXCEPTION_STATUS,
} from 'src/shared/exceptions/default-exception';
import { AuthErrorCode } from '../auth.constant';

const { DOMAIN_PREFIX, EXPIRED_OTP } = AuthErrorCode;
export class ExpiredEmailOtpException extends CustomException {
  readonly status = DEFAULT_EXCEPTION_STATUS.UNAUTHORIZED;
  readonly code = DOMAIN_PREFIX + EXPIRED_OTP;
  readonly message = '만료된 OTP입니다.';
}
