import { Module } from '@nestjs/common';
import { PaymentDomainModule } from 'src/domains/payment/payment.domain.module';
import { PaymentManagementController } from './payment-management.controller';
import { PaymentManagementService } from './payment-management.service';

@Module({
  imports: [PaymentDomainModule, PaymentDomainModule],
  controllers: [PaymentManagementController],
  providers: [PaymentManagementService],
})
export class PaymentManagementModule {}
