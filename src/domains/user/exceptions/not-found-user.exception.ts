import {
  CustomException,
  DEFAULT_EXCEPTION_STATUS,
} from 'src/shared/exceptions/default-exception';

import { UserErrorCode } from '../user.constant';

const { DOMAIN_PREFIX, NOT_FOUND_USER } = UserErrorCode;
export class NotFoundUserException extends CustomException {
  readonly status = DEFAULT_EXCEPTION_STATUS.NOT_FOUND;
  readonly code = DOMAIN_PREFIX + NOT_FOUND_USER;
  readonly message = '사용자를 찾을 수 없습니다.';
}
