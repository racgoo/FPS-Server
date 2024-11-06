import { PaymentItem } from '../../models/payment-item.model';

export interface CreatePaymentItemPort {
  execute(
    paymentItemData: Partial<PaymentItem> &
      Pick<PaymentItem, 'webtoonId' | 'price' | 'paymentId'>,
  ): Promise<PaymentItem>;
}
