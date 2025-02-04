import { OrderEntity } from "../entities/order.entity";

export class PaginateOrderOutputDto {
    data: OrderEntity[];
    pagination: {
        totalItems: number,
        totalPages: number,
        currentPage: number;
        pageSize: number,
    }
}