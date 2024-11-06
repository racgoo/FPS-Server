import { Injectable } from '@nestjs/common';

import { UpdatePaymentPort } from '../ports/driving/update-payment.port';
import { PaymentService } from '../services/payment.service';
import { Payment } from '../models/payment.model';

@Injectable()
export class UpdatePaymentUseCase implements UpdatePaymentPort {
  constructor(private readonly webtoonService: PaymentService) {}

  async execute(id: number, paymentData: Partial<Payment>): Promise<Payment> {
    return await this.webtoonService.update(id, paymentData);
  }
}
