import { Injectable } from '@nestjs/common';
import { Payment } from '../models/payment.model';
import {
  PaymentRelations,
  SqlitePaymentEntity,
} from 'src/persistent/sqlite/entities/sqlite-payment.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class PaymentService {
  constructor(
    @InjectRepository(SqlitePaymentEntity)
    private readonly paymentRepository: Repository<SqlitePaymentEntity>,
  ) {}

  async findByIdWithItems(id: number): Promise<Payment> {
    const payment = await this.paymentRepository.findOne({
      where: { id },
      relations: [PaymentRelations.PAYMENT_ITEMS],
    });
    if (!payment) {
      throw new Error('페이먼트를 찾을 수 없습니다.');
    }
    return payment;
  }

  async findById(id: number): Promise<Payment> {
    const payment = await this.paymentRepository.findOneBy({ id });
    if (!payment) {
      throw new Error('페이먼트를 찾을 수 없습니다.');
    }
    return payment;
  }

  async create(
    payment: Omit<
      Payment,
      'id' | 'createdAt' | 'updatedAt' | 'user' | 'paymentItems'
    >,
  ): Promise<Payment> {
    return this.paymentRepository.save(payment);
  }

  async update(
    id: number,
    payment: Partial<Omit<Payment, 'id' | 'createdAt' | 'updatedAt'>>,
  ): Promise<Payment> {
    await this.paymentRepository.update(id, payment);
    return this.paymentRepository.findOneBy({ id });
  }

  async delete(id: number): Promise<void> {
    await this.paymentRepository.delete(id);
  }
}
