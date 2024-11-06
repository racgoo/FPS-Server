export interface DeletePaymentPort {
  execute(id: number): Promise<void>;
}
