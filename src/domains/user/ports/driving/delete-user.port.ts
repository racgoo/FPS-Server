export interface DeleteUserPort {
  execute(id: number): Promise<void>;
}
