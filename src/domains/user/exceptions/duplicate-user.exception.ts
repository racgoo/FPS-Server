import {
  CustomException,
  DEFAULT_EXCEPTION_STATUS,
} from 'src/shared/exceptions/default-exception';

import { UserErrorCode } from '../user.constant';

const { DOMAIN_PREFIX, DUPLICATE_EMAIL } = UserErrorCode;
export class DuplicateUserException extends CustomException {
  readonly status = DEFAULT_EXCEPTION_STATUS.BAD_REQUEST;
  readonly code = DOMAIN_PREFIX + DUPLICATE_EMAIL;
  readonly message = '이미 존재하는 이메일입니다.';
}
