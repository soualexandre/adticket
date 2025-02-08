import { CategoryEntity } from "../entities/category.entity";

export class PaginateCategoryOutputDto {
    data: CategoryEntity[];
    pagination: {
        totalItems: number,
        totalPages: number,
        currentPage: number;
        pageSize: number,
    }
}