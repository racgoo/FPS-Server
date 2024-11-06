import { Injectable } from '@nestjs/common';
import { PaymentService } from '../services/payment.service';
import { DeletePaymentPort } from '../ports/driving/delete-payment.port';

@Injectable()
export class DeletePaymentUseCase implements DeletePaymentPort {
  constructor(private readonly paymentService: PaymentService) {}

  async execute(id: number) {
    await this.paymentService.delete(id);
  }
}
