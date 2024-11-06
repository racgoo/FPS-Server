import { Injectable } from '@nestjs/common';
import { PaymentService } from '../services/payment.service';
import { Payment } from '../models/payment.model';
import { CreatePaymentPort } from '../ports/driving/create-payment.port';

@Injectable()
export class CreatePaymentUseCase implements CreatePaymentPort {
  constructor(private readonly paymentService: PaymentService) {}

  async execute(
    paymentData: Omit<
      Payment,
      'id' | 'createdAt' | 'updatedAt' | 'user' | 'paymentItems'
    >,
  ): Promise<Payment> {
    return await this.paymentService.create(paymentData);
  }
}
