import { Payment } from '../../models/payment.model';

export interface GetPaymentPort {
  execute(id: number): Promise<Payment>;
}
