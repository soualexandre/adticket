import { Module } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CategoriesController } from './categories.controller';
import { CATEGORY_TYPE_GATEWAY } from './gateway/category.type.gateway';
import { CategoryPrismaGateway } from './gateway/category.prisma.gateway';
import { PrismaService } from 'src/services/prisma/prisma.service';

@Module({
  controllers: [CategoriesController],
  providers: [
    CategoriesService,
    PrismaService,
    {
      provide: CATEGORY_TYPE_GATEWAY,
      useClass: CategoryPrismaGateway,
    },
  ],
})
export class CategoriesModule { }