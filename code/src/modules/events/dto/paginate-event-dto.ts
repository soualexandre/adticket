import { EventEntity } from "../entities/event.entity";

export class PaginateEventOutputDto {
    data: EventEntity[];
    pagination: {
        totalItems: number,
        totalPages: number,
        currentPage: number;
        pageSize: number,
    }
}