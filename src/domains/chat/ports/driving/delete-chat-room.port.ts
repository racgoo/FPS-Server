export interface DeleteChatRoomPort {
  execute(params: { chatRoomId: number }): Promise<void>;
}
