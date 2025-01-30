import { UserEntity } from "../entities/user.entity";

export class PaginateUserOutputDto {
    data: UserEntity[];
    pagination: {
        totalItems: number,
        totalPages: number,
        currentPage: number;
        pageSize: number,
    }
}