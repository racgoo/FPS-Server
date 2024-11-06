import { Module } from '@nestjs/common';
import { PaymentService } from './services/payment.service';
import { CreatePaymentUseCase } from './use-cases/create-payment.use-case';
import { UpdatePaymentUseCase } from './use-cases/update-payment.use-case';
import { DeletePaymentUseCase } from './use-cases/delete-payment.use-case';
import { GetPaymentUseCase } from './use-cases/get-payment.use-case';
import { CreatePaymentItemUseCase } from './use-cases/create-payment-item.use-case';
import { PaymentItemService } from './services/payment-item.service';
import { SqlitePaymentEntity } from 'src/persistent/sqlite/entities/sqlite-payment.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SqlitePaymentItemEntity } from 'src/persistent/sqlite/entities/sqlite-payment-item.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([SqlitePaymentEntity, SqlitePaymentItemEntity]),
  ],
  providers: [
    PaymentService,
    PaymentItemService,
    CreatePaymentUseCase,
    CreatePaymentItemUseCase,
    UpdatePaymentUseCase,
    DeletePaymentUseCase,
    GetPaymentUseCase,
  ],
  exports: [
    CreatePaymentUseCase,
    CreatePaymentItemUseCase,
    UpdatePaymentUseCase,
    DeletePaymentUseCase,
    GetPaymentUseCase,
  ],
})
export class PaymentDomainModule {}
