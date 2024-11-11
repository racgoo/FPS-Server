import {
  CustomException,
  DEFAULT_EXCEPTION_STATUS,
} from 'src/shared/exceptions/default-exception';
import { AuthErrorCode } from '../auth.constant';

const { DOMAIN_PREFIX, EXPIRED_OTP } = AuthErrorCode;
export class ExpiredEmailOtpException extends CustomException {
  constructor(private readonly customMessage?: string) {
    super();
    this.message = customMessage ?? '만료된 OTP입니다.';
  }
  readonly message: string;
  readonly status = DEFAULT_EXCEPTION_STATUS.BAD_REQUEST;
  readonly code = DOMAIN_PREFIX + EXPIRED_OTP;
}
