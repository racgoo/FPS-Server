import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'log' })
export class SqliteLogEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  request: string;

  @Column()
  detail: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
