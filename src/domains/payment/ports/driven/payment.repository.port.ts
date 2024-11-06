import { Payment } from '../../models/payment.model';

export abstract class PaymentRepositoryPort {
  abstract findById(id: number): Promise<Payment | null>;
  abstract save(payment: Payment): Promise<Payment>;
  abstract update(id: number, webtoon: Partial<Payment>): Promise<Payment>;
  abstract delete(id: number): Promise<void>;
  abstract findByIdWithItems(id: number): Promise<Payment | null>;
}
