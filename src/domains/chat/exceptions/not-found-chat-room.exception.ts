import {
  CustomException,
  DEFAULT_EXCEPTION_STATUS,
} from 'src/shared/exceptions/default-exception';

import { ChatErrorCode } from '../chat.constant';

const { DOMAIN_PREFIX, NOT_FOUND_CHAT_ROOM } = ChatErrorCode;
export class NotFoundChatRoomException extends CustomException {
  readonly status = DEFAULT_EXCEPTION_STATUS.NOT_FOUND;
  readonly code = DOMAIN_PREFIX + NOT_FOUND_CHAT_ROOM;
  readonly message = '채팅방을 찾을 수 없습니다.';
}
