import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';
import { SqlitePaymentEntity } from './sqlite-payment.entity';

export enum UserType {
  USER = 'USER',
  ADMIN = 'ADMIN',
}

export enum UserRelations {
  WEBTOONS = 'webtoons',
  PAYMENTS = 'payments',
}

@Entity({ name: 'user' })
export class SqliteUserEntity {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  name: string;
  @Column({ unique: true })
  email: string;
  @Column()
  password: string;
  @Column()
  type: UserType;
  @CreateDateColumn()
  createdAt: Date;
  @UpdateDateColumn()
  updatedAt: Date;
  @OneToMany(() => SqlitePaymentEntity, (payment) => payment.user)
  payments: SqlitePaymentEntity[];
}
