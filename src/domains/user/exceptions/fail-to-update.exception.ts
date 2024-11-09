import {
  CustomException,
  DEFAULT_EXCEPTION_STATUS,
} from 'src/shared/exceptions/default-exception';

import { UserErrorCode } from '../user.constant';

const { DOMAIN_PREFIX, FAILED_TO_UPDATE_USER } = UserErrorCode;
export class FailedToUpdateUserException extends CustomException {
  readonly status = DEFAULT_EXCEPTION_STATUS.INTERNAL_SERVER_ERROR;
  readonly code = DOMAIN_PREFIX + FAILED_TO_UPDATE_USER;
  readonly message = '사용자 수정에 실패하였습니다.';
}
