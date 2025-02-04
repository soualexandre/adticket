import { TicketValidationsEntity } from "../entities/ticket-validation.entity";

export class PaginateTicketValidationOutputDto {
    data: TicketValidationsEntity[];
    pagination: {
        totalItems: number,
        totalPages: number,
        currentPage: number;
        pageSize: number,
    }
}