import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/services/prisma/prisma.service';
import { CreateTicketDto } from '../dto/create-ticket.dto';
import { PaginateTicketOutputDto } from '../dto/paginate-ticket.dto';
import { UpdateTicketDto } from '../dto/update-ticket.dto';
import { WhereTicketDto } from '../dto/where-ticket.dto';
import { TicketEntity } from '../entities/ticket.entity';
import { TicketTypePrismaGateway } from './ticket.type.gateway';

@Injectable()
export class TicketPrismaGateway implements TicketTypePrismaGateway {
  constructor(private readonly prisma: PrismaService) { }

  async create(createUserDto: CreateTicketDto): Promise<TicketEntity> {
    const ticket = await this.prisma.ticket.create({
      data: {
        ...createUserDto,
      },
      include: {
        batch: true
      },
    });

    return this.mapToUserEntity(ticket);
  }

  async findAll(skip: number, take: number, where?: WhereTicketDto): Promise<PaginateTicketOutputDto> {
    const users = await this.prisma.ticket.findMany({
      skip,
      take,
      where,
      include: {
        batch: {
        },
      },
    });

    const totalItems = await this.prisma.ticket.count({ where });
    const totalPages = Math.ceil(totalItems / take);

    return {
      data: users.map(ticket => this.mapToUserEntity(ticket)),
      pagination: {
        totalItems,
        totalPages,
        currentPage: skip / take + 1,
        pageSize: take,
      },
    };
  }



  async findOne(id: string): Promise<TicketEntity> {
    const ticket = await this.prisma.ticket.findUnique({
      where: { id },
      include: {
        batch: true
      },
    });

    if (!ticket) {
      throw new Error('User not found');
    }

    return this.mapToUserEntity(ticket);
  }

  async update(id: string, updateUserDto: UpdateTicketDto): Promise<TicketEntity> {
    const ticket = await this.prisma.ticket.update({
      where: { id },
      data: updateUserDto,
      include: {
        batch: true
      },
    });

    return this.mapToUserEntity(ticket);
  }

  async remove(id: string): Promise<boolean> {
    await this.prisma.ticket.delete({
      where: { id },
    });

    return true;
  }

  private mapToUserEntity(ticket: any): TicketEntity {
    return {
      id: ticket.id,
      eventId: ticket.eventId,
      batchId: ticket.batchId,
      userId: ticket.userId,
      price: ticket.price,
      quantity: ticket.quantity,
      totalPrice: ticket.totalPrice,
      event: ticket.event,
      batch: ticket.batch,
      user: ticket.user,
    };
  }
}