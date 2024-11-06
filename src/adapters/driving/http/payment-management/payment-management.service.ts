import { Injectable } from '@nestjs/common';
import { GetPaymentUseCase } from 'src/domains/payment/use-cases/get-payment.use-case';
import { CreatePaymentItemRequest } from './dto/create-payment-item.dto';
import { CreatePaymentItemUseCase } from 'src/domains/payment/use-cases/create-payment-item.use-case';
import { CreatePaymentUseCase } from 'src/domains/payment/use-cases/create-payment.use-case';

@Injectable()
export class PaymentManagementService {
  constructor(
    private readonly getPaymentUseCase: GetPaymentUseCase,
    private readonly createPaymentItemUseCase: CreatePaymentItemUseCase,
    private readonly createPaymentUseCase: CreatePaymentUseCase,
  ) {}

  async getPayments(userId: number) {
    return await this.getPaymentUseCase.execute(userId);
  }

  async createPaymentItem(paymentItemDto: CreatePaymentItemRequest) {
    return await this.createPaymentItemUseCase.execute(paymentItemDto);
  }

  async createPayment(userId: number) {
    return await this.createPaymentUseCase.execute({
      userId,
    });
  }
}
