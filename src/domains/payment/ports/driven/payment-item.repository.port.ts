import { PaymentItem } from '../../models/payment-item.model';

export abstract class PaymentItemRepositoryPort {
  abstract findById(id: number): Promise<PaymentItem | null>;
  abstract save(paymentItem: PaymentItem): Promise<PaymentItem>;
  abstract update(
    id: number,
    paymentItem: Partial<PaymentItem>,
  ): Promise<PaymentItem>;
  abstract delete(id: number): Promise<void>;
}
