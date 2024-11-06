export interface GetExistenceByEmailPort {
  execute(email: string): Promise<boolean>;
}
