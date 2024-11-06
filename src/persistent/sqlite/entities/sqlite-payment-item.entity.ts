import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { SqlitePaymentEntity } from './sqlite-payment.entity';

export enum PaymentItemRelations {
  PAYMENT = 'payment',
}

@Entity({ name: 'payment_item' })
export class SqlitePaymentItemEntity {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  price: number;
  @Column()
  webtoonId: number;
  @Column({ nullable: true })
  paymentId: number;
  @CreateDateColumn()
  createdAt: Date;
  @UpdateDateColumn()
  updatedAt: Date;
  @ManyToOne(() => SqlitePaymentEntity, (payment) => payment.paymentItems)
  @JoinColumn({ name: 'paymentId' })
  payment: SqlitePaymentEntity;
}
