import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { CATEGORY_TYPE_GATEWAY, CategoryTypePrismaGateway } from './gateway/category.type.gateway';

@Injectable()
export class CategoriesService {

  constructor(
    @Inject(CATEGORY_TYPE_GATEWAY) private readonly categoryGateway: CategoryTypePrismaGateway,
  ) { }

  async create(createCategoryDto: CreateCategoryDto) {
    try {
      const category = await this.categoryGateway.create(createCategoryDto);
      if (!category) {
        throw new HttpException('Category not created', HttpStatus.INTERNAL_SERVER_ERROR);
      }
      return category;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  findAll() {
    try {
      const page = 1;
      const limit = 1000;
      const skip = (page - 1) * limit;
      const take = limit;
      return this.categoryGateway.findAll(skip, take);
    } catch (err) {
      throw new HttpException(err.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  findOne(id: string) {
    try {
      const category = this.categoryGateway.findOne(id);
      if (!category) {
        throw new HttpException('Category not found', HttpStatus.NOT_FOUND);
      }
      return category;
    } catch (err) {
      throw new HttpException(err.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  update(id: string, updateCategoryDto: UpdateCategoryDto) {
    try {
      const category = this.categoryGateway.update(id, updateCategoryDto);
      if (!category) {
        throw new HttpException('Category not found', HttpStatus.NOT_FOUND);
      }
      return category;
    } catch (err) {
      throw new HttpException(err.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async remove(id: string) {
    try {
      const isRemoved = await this.categoryGateway.remove(id);
      if (!isRemoved) {
        throw new HttpException('Category not found', HttpStatus.NOT_FOUND);
      }
      return isRemoved;
    } catch (err) {
      throw new HttpException(err.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}