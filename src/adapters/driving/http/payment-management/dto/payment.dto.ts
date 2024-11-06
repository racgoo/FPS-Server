import { Expose, Type } from 'class-transformer';
import { PaymentItemDto } from './payment-item.dto';

export class PaymentDto {
  @Expose()
  public readonly id: number;
  @Expose()
  public readonly userId: number;
  @Expose()
  @Type(() => PaymentItemDto)
  public readonly paymentItems: PaymentItemDto[] = [];
  @Expose()
  public readonly createdAt: Date;
  @Expose()
  public readonly updatedAt: Date;
}
