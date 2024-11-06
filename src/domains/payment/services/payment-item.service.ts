import { Injectable } from '@nestjs/common';

import { PaymentItem } from '../models/payment-item.model';
import { SqlitePaymentItemEntity } from 'src/persistent/sqlite/entities/sqlite-payment-item.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class PaymentItemService {
  constructor(
    @InjectRepository(SqlitePaymentItemEntity)
    private readonly paymentItemRepository: Repository<SqlitePaymentItemEntity>,
  ) {}

  async findById(id: number): Promise<PaymentItem> {
    const paymentItem = await this.paymentItemRepository.findOneBy({ id });
    if (!paymentItem) {
      throw new Error('페이먼트 아이템을 찾을 수 없습니다.');
    }
    return paymentItem;
  }

  async create(
    paymentItem: Pick<PaymentItem, 'webtoonId' | 'price' | 'paymentId'>,
  ): Promise<PaymentItem> {
    return this.paymentItemRepository.save(paymentItem);
  }

  async update(
    id: number,
    paymentItem: Partial<Omit<PaymentItem, 'id' | 'createdAt' | 'updatedAt'>>,
  ): Promise<PaymentItem> {
    await this.paymentItemRepository.update(id, paymentItem);
    return this.paymentItemRepository.findOneBy({ id });
  }

  async delete(id: number): Promise<void> {
    await this.paymentItemRepository.delete(id);
  }
}
