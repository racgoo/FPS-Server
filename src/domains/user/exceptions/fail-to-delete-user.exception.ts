import {
  CustomException,
  DEFAULT_EXCEPTION_STATUS,
} from 'src/shared/exceptions/default-exception';

import { UserErrorCode } from './error.code';

const { DOMAIN_PREFIX, FAILED_TO_DELETE_USER } = UserErrorCode;
export class FailedToDeleteUserException extends CustomException {
  readonly status = DEFAULT_EXCEPTION_STATUS.INTERNAL_SERVER_ERROR;
  readonly code = DOMAIN_PREFIX + FAILED_TO_DELETE_USER;
  readonly message = '사용자 삭제에 실패하였습니다.';
}
