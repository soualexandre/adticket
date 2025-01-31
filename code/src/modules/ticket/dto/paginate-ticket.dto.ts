import { TicketEntity } from "../entities/ticket.entity";

export class PaginateTicketOutputDto {
    data: TicketEntity[];
    pagination: {
        totalItems: number,
        totalPages: number,
        currentPage: number;
        pageSize: number,
    }
}