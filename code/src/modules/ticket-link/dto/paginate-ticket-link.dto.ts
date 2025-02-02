import { TicketValidationsEntity } from "src/modules/ticket-validation/entities/ticket-validation.entity";
import { TicketLinkEntity } from "../entities/ticket-link.entity";

export class PaginateTicketLinkOutputDto {
    data: TicketValidationsEntity[];
    pagination: {
        totalItems: number,
        totalPages: number,
        currentPage: number;
        pageSize: number,
    }
}