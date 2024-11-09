import {
  CustomException,
  DEFAULT_EXCEPTION_STATUS,
} from 'src/shared/exceptions/default-exception';

import { UserErrorCode } from '../user.constant';

const { DOMAIN_PREFIX, FAILED_TO_CREATE_USER } = UserErrorCode;
export class FailedToCreateUserException extends CustomException {
  readonly status = DEFAULT_EXCEPTION_STATUS.INTERNAL_SERVER_ERROR;
  readonly code = DOMAIN_PREFIX + FAILED_TO_CREATE_USER;
  readonly message = '사용자 생성에 실패하였습니다.';
}
