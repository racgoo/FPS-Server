import { Type } from 'class-transformer';
import { IsNumber } from 'class-validator';
import { PaymentItemDto } from './payment-item.dto';

export class CreatePaymentItemRequest {
  @IsNumber()
  @Type(() => Number)
  public readonly price: number;
  @IsNumber()
  @Type(() => Number)
  public readonly webtoonId: number;
  @IsNumber()
  @Type(() => Number)
  public readonly paymentId: number;
}

export class CreatePaymentItemResponse extends PaymentItemDto {}
