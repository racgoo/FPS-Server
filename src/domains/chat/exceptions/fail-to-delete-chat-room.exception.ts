import {
  CustomException,
  DEFAULT_EXCEPTION_STATUS,
} from 'src/shared/exceptions/default-exception';

import { ChatErrorCode } from '../chat.constant';

const { DOMAIN_PREFIX, FAILED_TO_DELETE_CHAT_ROOM } = ChatErrorCode;
export class FailedToDeleteChatRoomException extends CustomException {
  readonly status = DEFAULT_EXCEPTION_STATUS.INTERNAL_SERVER_ERROR;
  readonly code = DOMAIN_PREFIX + FAILED_TO_DELETE_CHAT_ROOM;
  readonly message = '채팅방 삭제에 실패하였습니다.';
}