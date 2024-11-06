import { Payment } from '../../models/payment.model';

export interface CreatePaymentPort {
  execute(
    paymentData: Omit<Payment, 'id' | 'createdAt' | 'updatedAt'>,
  ): Promise<Payment>;
}
