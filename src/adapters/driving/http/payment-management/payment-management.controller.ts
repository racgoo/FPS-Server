import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { PaymentManagementService } from './payment-management.service';
import { JwtAuthGuard } from 'src/shared/guards/jwt-auth.guard';
import { GetTokenData } from 'src/shared/decorators/get-user.decorator';
import { TokenData } from 'src/shared/modules/auth/auth.interface';
import {
  CreatePaymentItemRequest,
  CreatePaymentItemResponse,
} from './dto/create-payment-item.dto';
import { ResponseType } from 'src/shared/decorators/response-type.decorator';
import { CreatePaymentResponse } from './dto/create-payment.dto';
import { GetPaymentsResponse } from './dto/get-payment.dto';

@Controller('payment-management')
export class PaymentManagementController {
  constructor(
    private readonly paymentManagementService: PaymentManagementService,
  ) {}

  @Get('payment')
  @UseGuards(JwtAuthGuard)
  @ResponseType(GetPaymentsResponse)
  async getPayments(@GetTokenData() tokenData: TokenData) {
    return await this.paymentManagementService.getPayments(
      tokenData.payload.id,
    );
  }

  @Post('payment-item')
  @UseGuards(JwtAuthGuard)
  @ResponseType(CreatePaymentItemResponse)
  async createPaymentItem(
    @GetTokenData() tokenData: TokenData,
    @Body() paymentItemDto: CreatePaymentItemRequest,
  ) {
    return await this.paymentManagementService.createPaymentItem(
      paymentItemDto,
    );
  }

  @Post('payment')
  @UseGuards(JwtAuthGuard)
  @ResponseType(CreatePaymentResponse)
  async createPayment(@GetTokenData() tokenData: TokenData) {
    return await this.paymentManagementService.createPayment(
      tokenData.payload.id,
    );
  }
}
