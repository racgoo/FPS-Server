export interface DeleteMessageFromChatRoomPort {
  execute(params: { chatMessageId: number; chatRoomId: number }): Promise<void>;
}
