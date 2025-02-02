import { CreateOrderDto } from '../dto/create-order.dto';
import { PaginateOrderOutputDto } from '../dto/paginate-guest.dto';
import { UpdateOrderDto } from '../dto/update-order.dto';
import { WhereOrderDto } from '../dto/where-guest.dto';
import { OrderEntity } from '../entities/order.entity';

export const ORDER_TYPE_GATEWAY = 'ORDER_TYPE_GATEWAY';

export interface OrderTypePrismaGateway {
    create(createOrderDto: CreateOrderDto): Promise<OrderEntity>;
    findAll(skip: number, take: number, where?: WhereOrderDto): Promise<PaginateOrderOutputDto>;
    findOne(id: string, where?: WhereOrderDto): Promise<OrderEntity>;
    update(
        id: string,
        updateOrderDto: UpdateOrderDto,
        where?: WhereOrderDto,
    ): Promise<OrderEntity>;
    remove(id: string): Promise<boolean>;
}