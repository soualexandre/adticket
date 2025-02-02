import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { ORDER_TYPE_GATEWAY, OrderTypePrismaGateway } from './gateway/order.type.gateway';

@Injectable()
export class OrdersService {

  constructor(
    @Inject(ORDER_TYPE_GATEWAY) private readonly orderGateway: OrderTypePrismaGateway,
  ) { }

  async create(createOrderDto: CreateOrderDto) {
    try {
      const order = await this.orderGateway.create(createOrderDto);
      if (!order) {
        throw new HttpException('Order not created', HttpStatus.INTERNAL_SERVER_ERROR);
      }
      return order;
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
      return this.orderGateway.findAll(skip, take);
    } catch (err) {
      throw new HttpException(err.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  findOne(id: string) {
    try {
      const order = this.orderGateway.findOne(id);
      if (!order) {
        throw new HttpException('Order not found', HttpStatus.NOT_FOUND);
      }
      return order;
    } catch (err) {
      throw new HttpException(err.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  update(id: string, updateOrderDto: UpdateOrderDto) {
    try {
      const order = this.orderGateway.update(id, updateOrderDto);
      if (!order) {
        throw new HttpException('Order not found', HttpStatus.NOT_FOUND);
      }
      return order;
    } catch (err) {
      throw new HttpException(err.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async remove(id: string) {
    try {
      const isRemoved = await this.orderGateway.remove(id);
      if (!isRemoved) {
        throw new HttpException('Order not found', HttpStatus.NOT_FOUND);
      }
      return isRemoved;
    } catch (err) {
      throw new HttpException(err.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}