import {
  CustomException,
  DEFAULT_EXCEPTION_STATUS,
} from 'src/shared/exceptions/default-exception';
import { AuthErrorCode } from '../auth.constant';

const { DOMAIN_PREFIX, FORBIDDEN } = AuthErrorCode;
export class ForbiddenException extends CustomException {
  readonly status = DEFAULT_EXCEPTION_STATUS.FORBIDDEN;
  readonly code = DOMAIN_PREFIX + FORBIDDEN;
  readonly message = '접근 권한이 없습니다.';
}
