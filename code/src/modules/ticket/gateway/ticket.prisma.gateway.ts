import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
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

  async create(createTicketDto: CreateTicketDto): Promise<TicketEntity> {
    console.log("create", createTicketDto);
    const ticketData: any = {
      event: { connect: { id: createTicketDto.eventId } },
      batch: { connect: { id: createTicketDto.batchId } },
      user: createTicketDto.userId ? { connect: { id: createTicketDto.userId } } : undefined,
      buyer: { connect: { id: createTicketDto.buyerId } },
      price: createTicketDto.price,
      status: "PENDING",
      ...(createTicketDto.orderId ? { order: { connect: { id: createTicketDto.orderId } } } : {}),
    };

    Object.keys(ticketData).forEach(key => ticketData[key] === undefined && delete ticketData[key]);

    const ticket = await this.prisma.ticket.create({ data: ticketData });

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
      buyerId: ticket.buyerId,
      guestId: ticket.guestId,
      order: ticket.order,
      orderId: ticket.orderId,
      status: ticket.status,
      event: ticket.event,
      ticketValidations: ticket.ticketValidations,
      batch: ticket.batch,
      user: ticket.user,
      buyer: ticket.buyer,
      guest: ticket.guest,
      link: ticket.link,
      createdAt: ticket.createdAt,
      updatedAt: ticket.updatedAt,
    };
  }
}