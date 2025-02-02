import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { UpdatePaymentDto } from './dto/update-payment.dto';
import { PAYMENT_TYPE_GATEWAY, PaymentTypePrismaGateway } from './gateway/payment.type.gateway';

@Injectable()
export class PaymentsService {

  constructor(
    @Inject(PAYMENT_TYPE_GATEWAY) private readonly paymentGateway: PaymentTypePrismaGateway,
  ) { }

  async create(createPaymentDto: CreatePaymentDto) {
    try {
      const payment = await this.paymentGateway.create(createPaymentDto);
      if (!payment) {
        throw new HttpException('Payment not created', HttpStatus.INTERNAL_SERVER_ERROR);
      }
      return payment;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  findAll() {
    try {
      const page = 1;
      const limit = 1000;
      const skip = (page - 1) * limit;
      const take = limit;
      return this.paymentGateway.findAll(skip, take);
    } catch (err) {
      throw new HttpException(err.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  findOne(id: string) {
    try {
      const payment = this.paymentGateway.findOne(id);
      if (!payment) {
        throw new HttpException('Payment not found', HttpStatus.NOT_FOUND);
      }
      return payment;
    } catch (err) {
      throw new HttpException(err.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  update(id: string, updatePaymentDto: UpdatePaymentDto) {
    try {
      const payment = this.paymentGateway.update(id, updatePaymentDto);
      if (!payment) {
        throw new HttpException('Payment not found', HttpStatus.NOT_FOUND);
      }
      return payment;
    } catch (err) {
      throw new HttpException(err.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async remove(id: string) {
    try {
      const isRemoved = await this.paymentGateway.remove(id);
      if (!isRemoved) {
        throw new HttpException('Payment not found', HttpStatus.NOT_FOUND);
      }
      return isRemoved;
    } catch (err) {
      throw new HttpException(err.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}