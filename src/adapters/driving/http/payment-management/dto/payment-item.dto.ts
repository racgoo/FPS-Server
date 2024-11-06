import { Expose } from 'class-transformer';

export class PaymentItemDto {
  @Expose()
  public readonly id: number;
  @Expose()
  public readonly paymentId: number;
  @Expose()
  public readonly price: number;
  @Expose()
  public readonly webtoonId: number;
  @Expose()
  public readonly createdAt: Date;
  @Expose()
  public readonly updatedAt: Date;
}
