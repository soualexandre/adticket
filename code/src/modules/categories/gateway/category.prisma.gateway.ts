import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/services/prisma/prisma.service';
import { CreateCategoryDto } from '../dto/create-category.dto';
import { UpdateCategoryDto } from '../dto/update-category.dto';
import { CategoryTypePrismaGateway } from './category.type.gateway';
import { CategoryEntity } from '../entities/category.entity';
import { WhereCategoryDto } from '../dto/where-event-dto';
import { PaginateCategoryOutputDto } from '../dto/paginate-event-dto';

@Injectable()
export class CategoryPrismaGateway implements CategoryTypePrismaGateway {
  constructor(private readonly prisma: PrismaService) { }

  async create(createCategoryDto: CreateCategoryDto): Promise<CategoryEntity> {
    const category = await this.prisma.category.create({
      data: {
        ...createCategoryDto,
      },
    });
    return this.mapToCategoryEntity(category);
  }

  async findAll(skip: number, take: number, where?: WhereCategoryDto): Promise<PaginateCategoryOutputDto> {
    const categories = await this.prisma.category.findMany({
      skip,
      take,
      where,
    });

    const totalItems = await this.prisma.category.count({ where });
    const totalPages = Math.ceil(totalItems / take);

    return {
      data: categories.map(category => this.mapToCategoryEntity(category)),
      pagination: {
        totalItems,
        totalPages,
        currentPage: skip / take + 1,
        pageSize: take,
      },
    };
  }

  async findOne(id: string): Promise<CategoryEntity> {
    const category = await this.prisma.category.findFirst({
      where: { id },
    });
    return this.mapToCategoryEntity(category);
  }

  async update(id: string, updateCategoryDto: UpdateCategoryDto): Promise<CategoryEntity> {
    const category = await this.prisma.category.update({
      where: { id },
      data: updateCategoryDto,
    });

    return this.mapToCategoryEntity(category);
  }

  async remove(id: string): Promise<boolean> {
    await this.prisma.category.delete({
      where: { id },
    });

    return true;
  }

  private mapToCategoryEntity(category: any): CategoryEntity {
    return {
      id: category.id,
      description: category.description,
      event: category.event,
      title: category.title,
      createdAt: category.createdAt,
      updatedAt: category.updatedAt,
    };
  }
}