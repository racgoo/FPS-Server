import { Payment } from '../../models/payment.model';

export interface UpdatePaymentPort {
  execute(id: number, paymentData: Partial<Payment>): Promise<Payment>;
}
