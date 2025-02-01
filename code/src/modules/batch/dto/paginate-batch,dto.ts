import { BatchEntity } from "../entities/batch.entity";

export class PaginateBatchOutputDto {
    data: BatchEntity[];
    pagination: {
        totalItems: number,
        totalPages: number,
        currentPage: number;
        pageSize: number,
    }
}