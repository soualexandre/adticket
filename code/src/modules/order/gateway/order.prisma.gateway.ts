import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/services/prisma/prisma.service';
import { CreateOrderDto } from '../dto/create-order.dto';
import { OrderEntity } from '../entities/order.entity';
import { UpdateOrderDto } from '../dto/update-order.dto';
import { OrderTypePrismaGateway } from './order.type.gateway';
import { PaginateOrderOutputDto } from '../dto/paginate-guest.dto';
import { WhereOrderDto } from '../dto/where-guest.dto';

@Injectable()
export class OrderPrismaGateway implements OrderTypePrismaGateway {
  constructor(private readonly prisma: PrismaService) { }

  async create(createOrderDto: CreateOrderDto): Promise<OrderEntity> {
    const order = await this.prisma.order.create({
      data: {
        ...createOrderDto,
      },
    });

    return this.mapToOrderEntity(order);
  }

  async findAll(skip: number, take: number, where?: WhereOrderDto): Promise<PaginateOrderOutputDto> {
    const orders = await this.prisma.order.findMany({
      skip,
      take,
      where,
    });

    const totalItems = await this.prisma.order.count({ where });
    const totalPages = Math.ceil(totalItems / take);

    return {
      data: orders.map(order => this.mapToOrderEntity(order)),
      pagination: {
        totalItems,
        totalPages,
        currentPage: skip / take + 1,
        pageSize: take,
      },
    };
  }

  async findOne(id: string): Promise<OrderEntity> {
    const order = await this.prisma.order.findUnique({
      where: { id },
    });

    if (!order) {
      throw new Error('Order not found');
    }

    return this.mapToOrderEntity(order);
  }

  async update(id: string, updateOrderDto: UpdateOrderDto): Promise<OrderEntity> {
    const order = await this.prisma.order.update({
      where: { id },
      data: updateOrderDto,
    });

    return this.mapToOrderEntity(order);
  }

  async remove(id: string): Promise<boolean> {
    await this.prisma.order.delete({
      where: { id },
    });

    return true;
  }

  private mapToOrderEntity(order: any): OrderEntity {
    return {
      id: order.id,
      totalAmount: order.totalAmount,
      payments: order.payments,
      tickets: order.tickets,
      userId: order.userId,
      user: order.user,
      status: order.status,
      createdAt: order.createdAt,
      updatedAt: order.updatedAt,
    };
  }
}