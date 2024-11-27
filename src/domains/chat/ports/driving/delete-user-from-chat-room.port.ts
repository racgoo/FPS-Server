export interface DeleteUserFromChatRoomPort {
  execute(params: { chatUserId: number; chatRoomId: number }): Promise<void>;
}
