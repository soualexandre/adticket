import { TicketLinkEntity } from "../entities/ticket-link.entity";

export class PaginateTicketLinkOutputDto {
    data: TicketLinkEntity[];
    pagination: {
        totalItems: number,
        totalPages: number,
        currentPage: number;
        pageSize: number,
    }
}