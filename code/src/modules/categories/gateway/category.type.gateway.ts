import { CreateCategoryDto } from "../dto/create-category.dto";
import { PaginateCategoryOutputDto } from "../dto/paginate-event-dto";
import { UpdateCategoryDto } from "../dto/update-category.dto";
import { WhereCategoryDto } from "../dto/where-event-dto";
import { CategoryEntity } from "../entities/category.entity";

export const CATEGORY_TYPE_GATEWAY = 'CATEGORY_TYPE_GATEWAY';

export interface CategoryTypePrismaGateway {
    create(createCategoryDto: CreateCategoryDto): Promise<CategoryEntity>;
    findAll(skip: number, take: number, where?: WhereCategoryDto): Promise<PaginateCategoryOutputDto>;
    findOne(id: string): Promise<CategoryEntity>;
    update(
        id: string,
        updateCategoryDto: UpdateCategoryDto,
    ): Promise<CategoryEntity>;
    remove(id: string): Promise<boolean>;
}