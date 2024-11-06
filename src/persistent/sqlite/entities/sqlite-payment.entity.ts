import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';
import { SqliteUserEntity } from './sqlite-user.entity';
import { SqlitePaymentItemEntity } from './sqlite-payment-item.entity';

export enum PaymentRelations {
  USER = 'user',
  PAYMENT_ITEMS = 'paymentItems',
}

@Entity({ name: 'payment' })
export class SqlitePaymentEntity {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  userId: number;
  @CreateDateColumn()
  createdAt: Date;
  @UpdateDateColumn()
  updatedAt: Date;
  @ManyToOne(() => SqliteUserEntity)
  @JoinColumn({ name: 'userId' })
  user: SqliteUserEntity;
  @OneToMany(
    () => SqlitePaymentItemEntity,
    (paymentItem) => paymentItem.payment,
  )
  paymentItems: SqlitePaymentItemEntity[];
}
