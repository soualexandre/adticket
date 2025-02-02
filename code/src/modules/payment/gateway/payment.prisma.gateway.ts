import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/services/prisma/prisma.service';
import { CreatePaymentDto } from '../dto/create-payment.dto';
import { UpdatePaymentDto } from '../dto/update-payment.dto';
import { PaymentEntity } from '../entities/payment.entity';
import { PaymentTypePrismaGateway } from './payment.type.gateway';
import { WherePaymentDto } from '../dto/where-payment.dto';
import { PaginatePaymentOutputDto } from '../dto/paginate-payment.dto';

@Injectable()
export class PaymentPrismaGateway implements PaymentTypePrismaGateway {
  constructor(private readonly prisma: PrismaService) { }

  async create(createPaymentDto: CreatePaymentDto): Promise<PaymentEntity> {
    const payment = await this.prisma.payment.create({
      data: {
        ...createPaymentDto,
      },
    });

    return this.mapToPaymentEntity(payment);
  }

  async findAll(skip: number, take: number, where?: WherePaymentDto): Promise<PaginatePaymentOutputDto> {
    const payments = await this.prisma.payment.findMany({
      skip,
      take,
      where,
    });

    const totalItems = await this.prisma.payment.count({ where });
    const totalPages = Math.ceil(totalItems / take);

    return {
      data: payments.map(payment => this.mapToPaymentEntity(payment)),
      pagination: {
        totalItems,
        totalPages,
        currentPage: skip / take + 1,
        pageSize: take,
      },
    };
  }

  async findOne(id: string): Promise<PaymentEntity> {
    const payment = await this.prisma.payment.findUnique({
      where: { id },
    });

    if (!payment) {
      throw new Error('Payment not found');
    }

    return this.mapToPaymentEntity(payment);
  }

  async update(id: string, updatePaymentDto: UpdatePaymentDto): Promise<PaymentEntity> {
    const payment = await this.prisma.payment.update({
      where: { id },
      data: updatePaymentDto,
    });

    return this.mapToPaymentEntity(payment);
  }

  async remove(id: string): Promise<boolean> {
    await this.prisma.payment.delete({
      where: { id },
    });

    return true;
  }

  private mapToPaymentEntity(payment: any): PaymentEntity {
    return {
      id: payment.id,
      orderId: payment.orderId,
      amount: payment.amount,
      status: payment.status,
      method: payment.method,
      transactionId: payment.transactionId,
      order: payment.order,
      createdAt: payment.createdAt,
      updatedAt: payment.updatedAt,
    };
  }
}