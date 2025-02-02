import { GuestEntity } from "../entities/guest.entity";

export class PaginateGuestOutputDto {
    data: GuestEntity[];
    pagination: {
        totalItems: number,
        totalPages: number,
        currentPage: number;
        pageSize: number,
    }
}