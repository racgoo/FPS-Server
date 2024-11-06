import { Injectable } from '@nestjs/common';

import { PaymentItem } from '../models/payment-item.model';
import { PaymentItemService } from '../services/payment-item.service';
import { CreatePaymentItemPort } from '../ports/driving/create-payment-item.port';

@Injectable()
export class CreatePaymentItemUseCase implements CreatePaymentItemPort {
  constructor(private readonly paymentItemService: PaymentItemService) {}

  async execute(
    paymentItemData: Partial<PaymentItem> &
      Pick<PaymentItem, 'webtoonId' | 'price' | 'paymentId'>,
  ): Promise<PaymentItem> {
    return await this.paymentItemService.create(paymentItemData);
  }
}
