import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/services/prisma/prisma.service';
import { GuestTypePrismaGateway } from './guest.type.gateway';
import { CreateGuestDto } from '../dto/create-guest.dto';
import { GuestEntity } from '../entities/guest.entity';
import { UpdateGuestDto } from '../dto/update-guest.dto';
import { WhereGuestDto } from '../dto/where-guest.dto';
import { PaginateGuestOutputDto } from '../dto/paginate-guest.dto';

@Injectable()
export class GuestPrismaGateway implements GuestTypePrismaGateway {
  constructor(private readonly prisma: PrismaService) { }

  async create(createGuestDto: CreateGuestDto): Promise<GuestEntity> {
    const guest = await this.prisma.guest.create({
      data: {
        ...createGuestDto,
      },
    });
    return this.mapToGuestEntity(guest);
  }

  async findAll(skip: number, take: number, where?: WhereGuestDto): Promise<PaginateGuestOutputDto> {
    const guests = await this.prisma.guest.findMany({
      skip,
      take,
      where,
    });

    const totalItems = await this.prisma.guest.count({ where });
    const totalPages = Math.ceil(totalItems / take);

    return {
      data: guests.map(guest => this.mapToGuestEntity(guest)),
      pagination: {
        totalItems,
        totalPages,
        currentPage: skip / take + 1,
        pageSize: take,
      },
    };
  }

  async findOne(id: string): Promise<GuestEntity> {
    const guest = await this.prisma.guest.findUnique({
      where: { id },
    });

    if (!guest) {
      throw new Error('Guest not found');
    }

    return this.mapToGuestEntity(guest);
  }

  async update(id: string, updateGuestDto: UpdateGuestDto): Promise<GuestEntity> {
    const guest = await this.prisma.guest.update({
      where: { id },
      data: updateGuestDto,
    });

    return this.mapToGuestEntity(guest);
  }

  async remove(id: string): Promise<boolean> {
    await this.prisma.guest.delete({
      where: { id },
    });

    return true;
  }

  private mapToGuestEntity(guest: any): GuestEntity {
    return {
      id: guest.id,
      name: guest.name,
      email: guest.email,
      phoneNumber: guest.phoneNumber,
      tickets: guest.tickets,
      createdAt: guest.createdAt,
      updatedAt: guest.updatedAt,
    };
  }
}
