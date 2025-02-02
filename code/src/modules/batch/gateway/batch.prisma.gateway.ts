import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/services/prisma/prisma.service';
import { BatchTypePrismaGateway } from './batch.type.gateway';
import { CreateBatchDto } from '../dto/create-batch.dto';
import { BatchEntity } from '../entities/batch.entity';
import { PaginateBatchOutputDto } from '../dto/paginate-batch,dto';
import { WhereBatchDto } from '../dto/where-batch.dto';
import { UpdateBatchDto } from '../dto/update-batch.dto';

@Injectable()
export class BatchPrismaGateway implements BatchTypePrismaGateway {
  constructor(private readonly prisma: PrismaService) { }

  async create(createBatchDto: CreateBatchDto): Promise<BatchEntity> {
    const batch = await this.prisma.batch.create({
      data: {
        ...createBatchDto,
      },
      include: {
        event: true
      },
    });

    return this.mapToUserEntity(batch);
  }

  async findAll(skip: number, take: number, where?: WhereBatchDto): Promise<PaginateBatchOutputDto> {
    const users = await this.prisma.batch.findMany({
      skip,
      take,
      where,
      include: {
        event: {
        },
      },
    });

    const totalItems = await this.prisma.batch.count({ where });
    const totalPages = Math.ceil(totalItems / take);

    return {
      data: users.map(batch => this.mapToUserEntity(batch)),
      pagination: {
        totalItems,
        totalPages,
        currentPage: skip / take + 1,
        pageSize: take,
      },
    };
  }



  async findOne(id: string): Promise<BatchEntity> {
    const batch = await this.prisma.batch.findUnique({
      where: { id },
      include: {
        event: true
      },
    });

    if (!batch) {
      throw new Error('User not found');
    }

    return this.mapToUserEntity(batch);
  }

  async update(id: string, updateUserDto: UpdateBatchDto): Promise<BatchEntity> {
    const batch = await this.prisma.batch.update({
      where: { id },
      data: updateUserDto,
      include: {
        event: true
      },
    });

    return this.mapToUserEntity(batch);
  }

  async remove(id: string): Promise<boolean> {
    await this.prisma.batch.delete({
      where: { id },
    });

    return true;
  }

  private mapToUserEntity(batch: any): BatchEntity {
    return {
      id: batch.id,
      eventId: batch.eventId,
      price: batch.price,
      quantity: batch.quantity,
      tickets: batch.tickets,
      event: batch.event,
      createdAt: batch.createdAt,
      updatedAt: batch.updatedAt,
    };
  }
}