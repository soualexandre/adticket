import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/services/prisma/prisma.service';
import { CreateTicketLinkDto } from '../dto/create-ticket-link.dto';
import { UpdateTicketLinkDto } from '../dto/update-ticket-link.dto';
import { TicketLinkEntity } from '../entities/ticket-link.entity';
import { WhereTicketLinkDto } from '../dto/where-ticket-link.dto';
import { PaginateTicketLinkOutputDto } from '../dto/paginate-ticket-link.dto';
import { TicketLinkTypePrismaGateway } from './ticketLink.type.gateway';

@Injectable()
export class TicketLinkPrismaGateway implements TicketLinkTypePrismaGateway {
  constructor(private readonly prisma: PrismaService) { }

  async create(createTicketLinkDto: CreateTicketLinkDto): Promise<TicketLinkEntity> {
    const ticketLink = await this.prisma.ticketLink.create({
      data: {
        ...createTicketLinkDto,
      },
    });

    return this.mapToTicketLinkEntity(ticketLink);
  }

  async findAll(skip: number, take: number, where?: WhereTicketLinkDto): Promise<PaginateTicketLinkOutputDto> {
    const ticketLinks = await this.prisma.ticketLink.findMany({
      skip,
      take,
      where,
    });

    const totalItems = await this.prisma.ticketLink.count({ where });
    const totalPages = Math.ceil(totalItems / take);

    return {
      data: ticketLinks.map(ticketLink => this.mapToTicketLinkEntity(ticketLink)),
      pagination: {
        totalItems,
        totalPages,
        currentPage: skip / take + 1,
        pageSize: take,
      },
    };
  }

  async findOne(id: string): Promise<TicketLinkEntity> {
    const ticketLink = await this.prisma.ticketLink.findUnique({
      where: { id },
    });

    if (!ticketLink) {
      throw new Error('Ticket link not found');
    }

    return this.mapToTicketLinkEntity(ticketLink);
  }

  async update(id: string, updateTicketLinkDto: UpdateTicketLinkDto): Promise<TicketLinkEntity> {
    const ticketLink = await this.prisma.ticketLink.update({
      where: { id },
      data: updateTicketLinkDto,
    });

    return this.mapToTicketLinkEntity(ticketLink);
  }

  async remove(id: string): Promise<boolean> {
    await this.prisma.ticketLink.delete({
      where: { id },
    });

    return true;
  }

  private mapToTicketLinkEntity(ticketLink: any): TicketLinkEntity {
    return {
      id: ticketLink.id,
      ticketId: ticketLink.ticketId,
      link: ticketLink.link,
      createdAt: ticketLink.createdAt,
      updatedAt: ticketLink.updatedAt,
    };
  }
}