import { IsNumber } from 'class-validator';
import { PaymentDto } from './payment.dto';

export class CreatePaymentRequest {
  @IsNumber()
  public readonly paymentItemId: number;
}

export class CreatePaymentResponse extends PaymentDto {}
