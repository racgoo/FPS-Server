import {
  CustomException,
  DEFAULT_EXCEPTION_STATUS,
} from 'src/shared/exceptions/default-exception';
import { AuthErrorCode } from '../auth.constant';

const { DOMAIN_PREFIX, NOT_FOUND_OTP } = AuthErrorCode;
export class NotFoundEmailOtpException extends CustomException {
  readonly status = DEFAULT_EXCEPTION_STATUS.UNAUTHORIZED;
  readonly code = DOMAIN_PREFIX + NOT_FOUND_OTP;
  readonly message = '이메일 인증 과정이 필요합니다..';
}
