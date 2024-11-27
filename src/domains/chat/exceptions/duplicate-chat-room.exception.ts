import {
  CustomException,
  DEFAULT_EXCEPTION_STATUS,
} from 'src/shared/exceptions/default-exception';

import { ChatErrorCode } from '../chat.constant';

const { DOMAIN_PREFIX, DUPLICATE_CHAT_ROOM } = ChatErrorCode;
export class DuplicateChatRoomException extends CustomException {
  readonly status = DEFAULT_EXCEPTION_STATUS.BAD_REQUEST;
  readonly code = DOMAIN_PREFIX + DUPLICATE_CHAT_ROOM;
  readonly message = '이미 존재하는 채팅방입니다.';
}
