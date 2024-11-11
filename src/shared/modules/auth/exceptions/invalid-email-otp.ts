import {
  CustomException,
  DEFAULT_EXCEPTION_STATUS,
} from 'src/shared/exceptions/default-exception';
import { AuthErrorCode } from '../auth.constant';

const { DOMAIN_PREFIX, INVALID_OTP } = AuthErrorCode;
export class InvalidEmailOtpException extends CustomException {
  constructor(private readonly customMessage?: string) {
    super();
    this.message = customMessage ?? '유효하지 않은 코드입니다.';
  }
  readonly message: string;
  readonly status = DEFAULT_EXCEPTION_STATUS.BAD_REQUEST;
  readonly code = DOMAIN_PREFIX + INVALID_OTP;
}
