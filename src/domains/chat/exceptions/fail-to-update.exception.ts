import {
  CustomException,
  DEFAULT_EXCEPTION_STATUS,
} from 'src/shared/exceptions/default-exception';

import { ChatErrorCode } from '../chat.constant';

const { DOMAIN_PREFIX, FAILED_TO_UPDATE_CHAT_ROOM } = ChatErrorCode;
export class FailedToUpdateChatRoomException extends CustomException {
  readonly status = DEFAULT_EXCEPTION_STATUS.INTERNAL_SERVER_ERROR;
  readonly code = DOMAIN_PREFIX + FAILED_TO_UPDATE_CHAT_ROOM;
  readonly message = '채팅방 수정에 실패하였습니다.';
}